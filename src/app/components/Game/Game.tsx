import * as React from "react";
import { useParams } from "react-router-dom";
import { reducer, deserialize, getInitialState } from "app/GameState";
import { useLocaleContext } from "app/i18n";
import { PhaseGameOver } from "./PhaseGameOver";
import { PhaseInProgress } from "./PhaseInProgress";
import { PhaseLoading } from "./PhaseLoading";

const PHASES = {
  loading: PhaseLoading,
  inProgress: PhaseInProgress,
  gameOver: PhaseGameOver,
};

export function Game() {
  const { questions } = useParams<{ questions: string }>();
  const { cards } = useLocaleContext();
  const [gameState, dispatch] = React.useReducer(
    reducer,
    getInitialState(deserialize(questions, cards))
  );
  const CurrentPhase = PHASES[gameState.phase];

  return <CurrentPhase gameState={gameState} dispatch={dispatch} />;
}
