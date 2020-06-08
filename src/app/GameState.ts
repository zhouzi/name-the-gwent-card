import createDebug from "debug";
import randomItem from "random-item";
import lzString from "lz-string";

const debug = createDebug("GameState");

export type DifficultyLevel = "easy" | "medium" | "hard" | "extreme";

export interface Difficulty {
  difficultyLevel: DifficultyLevel;
  visualEffects: VisualEffect[];
  hints: boolean;
}

export const DIFFICULTIES: Difficulty[] = [
  {
    difficultyLevel: "easy",
    visualEffects: [],
    hints: true,
  },
  {
    difficultyLevel: "medium",
    visualEffects: [
      {
        type: "zoom",
        zoom: 2,
      },
    ],
    hints: false,
  },
  {
    difficultyLevel: "hard",
    visualEffects: [
      {
        type: "zoom",
        zoom: 5,
      },
    ],
    hints: false,
  },
  {
    difficultyLevel: "extreme",
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
    hints: false,
  },
];

export type VisualEffect =
  | {
      type: "zoom";
      zoom: number;
    }
  | {
      type: "blur";
      blur: number;
    };

export interface Question {
  card: GwentCard;
}

export interface Answer {
  id: number | null;
  username: string | null;
}

export interface GameState {
  difficultyLevel: DifficultyLevel;
  phase: "loading" | "inProgress" | "gameOver";
  currentQuestionIndex: number;
  questions: Question[];
  answers: Answer[];
}

export interface GameRules {
  difficultyLevel: DifficultyLevel;
  questions: Question[];
}

type CompressedGameRules = [DifficultyLevel, number[]];

function getRandomCards(
  cards: GwentCard[],
  length: number,
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

export function createQuestions(cards: GwentCard[]): Question[] {
  return getRandomCards(cards, 10).map((card) => ({
    card,
  }));
}

export function serialize(gameRules: GameRules): string {
  const compressedGameState: CompressedGameRules = [
    gameRules.difficultyLevel,
    gameRules.questions.map((question) => question.card.id),
  ];
  return lzString.compressToEncodedURIComponent(
    JSON.stringify(compressedGameState)
  );
}

export function deserialize(
  serializedCompressedGameRules: string,
  cards: GwentCard[]
): GameRules {
  const compressedGameRules: CompressedGameRules = JSON.parse(
    // This function is fragile on purpose, we want it to throw an error
    // if there's an issue with the serialized string.
    lzString.decompressFromEncodedURIComponent(serializedCompressedGameRules)!
  );
  return {
    difficultyLevel: compressedGameRules[0],
    questions: compressedGameRules[1].map((id) => {
      const card = cards.find((card) => card.id === id);

      if (card == null) {
        throw new Error(`No cards with id ${id} found.`);
      }

      return {
        card,
      };
    }),
  };
}

export function getInitialState(gameRules: GameRules): GameState {
  return {
    difficultyLevel: gameRules.difficultyLevel,
    phase: "loading",
    currentQuestionIndex: 0,
    questions: gameRules.questions,
    answers: [],
  };
}

export type Action =
  | { type: "loaded" }
  | { type: "answer"; id: number | null; username: string | null }
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
          action.id !==
            gameState.questions[gameState.currentQuestionIndex].card.id
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
              id: action.id,
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
