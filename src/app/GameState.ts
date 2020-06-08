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
    visualEffects: [],
    hints: false,
  },
  {
    difficultyLevel: "hard",
    visualEffects: [],
    hints: false,
  },
  {
    difficultyLevel: "extreme",
    visualEffects: [],
    hints: false,
  },
];

export type VisualEffect = {
  type: "zoom";
  zoom: number;
};

export interface Question {
  card: GwentCard;
  visualEffects: VisualEffect[];
}

type CompressedQuestion = [number, VisualEffect[]];

export interface Answer {
  id: number | null;
  username: string | null;
}

export interface GameState {
  phase: "loading" | "inProgress" | "gameOver";
  currentQuestionIndex: number;
  questions: Question[];
  answers: Answer[];
}

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

export function createQuestions(
  cards: GwentCard[],
  difficultyLevel: DifficultyLevel
): Question[] {
  return getRandomCards(cards, 10).map((card) => ({
    card,
    visualEffects: [],
  }));
}

export function serialize(questions: Question[]): string {
  const compressedQuestions: CompressedQuestion[] = questions.map(
    (question) => [question.card.id, question.visualEffects]
  );
  return lzString.compressToEncodedURIComponent(
    JSON.stringify(compressedQuestions)
  );
}

export function deserialize(questions: string, cards: GwentCard[]): Question[] {
  const compressedQuestions: CompressedQuestion[] = JSON.parse(
    // This function is fragile on purpose, we want it to throw an error
    // if there's an issue with the serialized string.
    lzString.decompressFromEncodedURIComponent(questions) as string
  );
  return compressedQuestions.map(([id, visualEffects]) => {
    const card = cards.find((card) => card.id === id);

    if (card == null) {
      throw new Error(`No cards with id ${id} found.`);
    }

    return {
      card,
      visualEffects,
    };
  });
}

export function getInitialState(questions: Question[]): GameState {
  return {
    phase: "loading",
    currentQuestionIndex: 0,
    questions,
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
