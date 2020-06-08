import * as React from "react";
import { GameState, Action } from "app/GameState";

interface Props {
  gameState: GameState;
  dispatch: React.Dispatch<Action>;
}

export function PhaseGameOver(props: Props) {
  return <div />;
}
