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

export enum InputMode {
  Autocomplete = "autocomplete",
  Choices = "choices",
}

export interface Difficulty {
  difficultyLevel: DifficultyLevel;
  visualEffects: VisualEffect[];
  inputMode: InputMode;
}

export const DIFFICULTIES: Record<DifficultyLevel, Difficulty> = {
  [DifficultyLevel.Easy]: {
    difficultyLevel: DifficultyLevel.Easy,
    visualEffects: [],
    inputMode: InputMode.Choices,
  },
  [DifficultyLevel.Medium]: {
    difficultyLevel: DifficultyLevel.Medium,
    visualEffects: [],
    inputMode: InputMode.Autocomplete,
  },
  [DifficultyLevel.Hard]: {
    difficultyLevel: DifficultyLevel.Hard,
    visualEffects: [
      {
        type: "zoom",
        zoom: 5,
      },
    ],
    inputMode: InputMode.Choices,
  },
  [DifficultyLevel.Extreme]: {
    difficultyLevel: DifficultyLevel.Extreme,
    visualEffects: [
      {
        type: "zoom",
        zoom: 5,
      },
    ],
    inputMode: InputMode.Autocomplete,
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
  answers: Answer[];
}

export interface Answer {
  cardID: number;
  username: string;
}

export enum GamePhase {
  Loading = "loading",
  InProgress = "inProgress",
  Break = "break",
  GameOver = "gameOver",
}

export interface GameState {
  difficultyLevel: DifficultyLevel;
  phase: GamePhase;
  currentQuestionIndex: number;
  questions: Question[];
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
    phase: GamePhase.Loading,
    currentQuestionIndex: 0,
    questions: gameRules[1].map((cardID) => ({
      cardID,
      answers: [],
    })),
  };
}

export type Action =
  | { type: "loaded" }
  | { type: "answer"; cardID: number; username: string }
  | { type: "timeOver" }
  | { type: "nextQuestion" };

export function reducer(draft: GameState, action: Action): void {
  switch (action.type) {
    case "loaded": {
      if (draft.phase === "loading") {
        debug("The game is loaded, now starting");
        draft.phase = GamePhase.InProgress;

        return;
      }

      debug("Loaded was dispatched although the game is not currently loading");
      return;
    }

    case "answer": {
      if (draft.phase !== GamePhase.InProgress) {
        debug(
          `Cannot submit an answer outside of the ${GamePhase.InProgress} phase (currently ${draft.phase})`
        );
        return;
      }

      draft.questions[draft.currentQuestionIndex].answers.push({
        cardID: action.cardID,
        username: action.username,
      });
      draft.phase = GamePhase.Break;

      return;
    }

    case "timeOver": {
      if (draft.phase !== GamePhase.InProgress) {
        debug(
          `Cannot time over outside of the ${GamePhase.InProgress} phase (currently ${draft.phase})`
        );
        return;
      }

      draft.phase = GamePhase.Break;
      return;
    }

    case "nextQuestion": {
      if (draft.phase !== GamePhase.Break) {
        debug(
          "The game must go through a break phase before moving on to the next question"
        );
        return;
      }

      if (draft.currentQuestionIndex + 1 >= draft.questions.length) {
        draft.phase = GamePhase.GameOver;
        return;
      }

      draft.phase = GamePhase.InProgress;
      draft.currentQuestionIndex += 1;
      return;
    }

    default:
      return;
  }
}
