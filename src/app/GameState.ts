import createDebug from "debug";
import randomItem from "random-item";
import lzString from "lz-string";

const debug = createDebug("GameState");

export enum DifficultyLevel {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
  Extreme = "extreme",
}

export interface Difficulty {
  difficultyLevel: DifficultyLevel;
  visualEffects: VisualEffect[];
}

export const DIFFICULTIES: Record<DifficultyLevel, Difficulty> = {
  [DifficultyLevel.Easy]: {
    difficultyLevel: DifficultyLevel.Easy,
    visualEffects: [],
  },
  [DifficultyLevel.Medium]: {
    difficultyLevel: DifficultyLevel.Medium,
    visualEffects: [
      {
        type: "zoom",
        zoom: 2,
      },
    ],
  },
  [DifficultyLevel.Hard]: {
    difficultyLevel: DifficultyLevel.Hard,
    visualEffects: [
      {
        type: "zoom",
        zoom: 5,
      },
    ],
  },
  [DifficultyLevel.Extreme]: {
    difficultyLevel: DifficultyLevel.Extreme,
    visualEffects: [
      {
        type: "zoom",
        zoom: 5,
      },
      {
        type: "blur",
        blur: 8,
      },
    ],
  },
};

export type VisualEffect =
  | {
      type: "zoom";
      zoom: number;
    }
  | {
      type: "blur";
      blur: number;
    };

export type CardID = number;

export interface Question {
  cardID: CardID;
}

export interface Answer {
  cardID: number | null;
  username: string | null;
}

export interface GameState {
  difficultyLevel: DifficultyLevel;
  phase: "loading" | "inProgress" | "gameOver";
  currentQuestionIndex: number;
  questions: Question[];
  answers: Answer[];
}

export type GameRules = [DifficultyLevel, CardID[]];

export function getRandomCards(
  cards: GwentCard[],
  length: number = 10,
  acc: GwentCard[] = []
): GwentCard[] {
  if (acc.length >= length) {
    return acc;
  }

  const randomCard = randomItem(cards);

  if (acc.find((otherCard) => otherCard.id === randomCard.id)) {
    return getRandomCards(cards, length, acc);
  }

  return getRandomCards(cards, length, acc.concat([randomCard]));
}

export function serialize(gameRules: GameRules): string {
  return lzString.compressToEncodedURIComponent(JSON.stringify(gameRules));
}

export function deserialize(
  serializedGameRules: string,
  cards: GwentCard[]
): GameRules | null {
  try {
    const compressedGameRules: GameRules = JSON.parse(
      lzString.decompressFromEncodedURIComponent(serializedGameRules)!
    );

    if (
      !Array.isArray(compressedGameRules) ||
      compressedGameRules.length !== 2
    ) {
      throw new Error("Serialized game rules are malformatted");
    }

    const [difficultyLevel, cardIDs] = compressedGameRules;

    const difficulty = DIFFICULTIES[difficultyLevel];
    if (difficulty == null) {
      throw new Error(`Unknown difficulty level "${difficultyLevel}"`);
    }

    if (
      cardIDs.some((cardID) => cards.find((card) => card.id === cardID) == null)
    ) {
      throw new Error(
        `Some cards are missing from the pool of available cards`
      );
    }

    return [difficulty.difficultyLevel, cardIDs];
  } catch (err) {}

  return null;
}

export function getInitialState(gameRules: GameRules): GameState {
  return {
    difficultyLevel: gameRules[0],
    phase: "loading",
    currentQuestionIndex: 0,
    questions: gameRules[1].map((cardID) => ({
      cardID,
    })),
    answers: [],
  };
}

export type Action =
  | { type: "loaded" }
  | { type: "answer"; cardID: number | null; username: string | null }
  | { type: "nextQuestion" };

export function reducer(gameState: GameState, action: Action): GameState {
  switch (action.type) {
    case "loaded": {
      if (gameState.phase === "loading") {
        debug("The game is loaded, now starting");
        return {
          ...gameState,
          phase: "inProgress",
        };
      }

      debug("Loaded was dispatched although the game is not currently loading");
      return gameState;
    }

    case "answer": {
      if (gameState.currentQuestionIndex === gameState.answers.length) {
        if (
          action.username &&
          action.cardID !==
            gameState.questions[gameState.currentQuestionIndex].cardID
        ) {
          debug(
            `${action.username} from the Twitch chat made a mistake, they're forgiven`
          );
          return gameState;
        }

        return {
          ...gameState,
          answers: gameState.answers.concat([
            {
              cardID: action.cardID,
              username: action.username,
            },
          ]),
        };
      }

      debug("An answer has already been submitted for this question");
      return gameState;
    }

    case "nextQuestion": {
      if (gameState.answers[gameState.currentQuestionIndex] == null) {
        debug(
          "An answer must be submitted before proceeding to the next question"
        );
        return gameState;
      }

      if (gameState.currentQuestionIndex + 1 >= gameState.questions.length) {
        return {
          ...gameState,
          phase: "gameOver",
        };
      }

      return {
        ...gameState,
        currentQuestionIndex: gameState.currentQuestionIndex + 1,
      };
    }

    default:
      return gameState;
  }
}
