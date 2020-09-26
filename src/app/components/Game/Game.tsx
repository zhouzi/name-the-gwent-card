import * as React from "react";
import { useImmerReducer } from "use-immer";
import createDebug from "debug";
import { Client } from "tmi.js";
import { reducer, getInitialState, GameRules, GamePhase } from "app/GameState";
import { useLocaleContext } from "app/i18n";
import { PhaseGameOver } from "./PhaseGameOver";
import { PhaseInProgress } from "./PhaseInProgress";
import { PhaseBreak } from "./PhaseBreak";
import { PhaseLoading } from "./PhaseLoading";

const debug = createDebug("Game");

const PHASES = {
  [GamePhase.Loading]: PhaseLoading,
  [GamePhase.InProgress]: PhaseInProgress,
  [GamePhase.Break]: PhaseBreak,
  [GamePhase.GameOver]: PhaseGameOver,
};

interface GameProps {
  channel?: string;
  gameRules: GameRules;
}

export function Game({ channel, gameRules }: GameProps) {
  const { fuse } = useLocaleContext();
  const [gameState, dispatch] = useImmerReducer(
    reducer,
    getInitialState(gameRules)
  );
  const correctAnswerRef = React.useRef<number | null>(null);
  const CurrentPhase = PHASES[gameState.phase];

  correctAnswerRef.current =
    gameState.questions[gameState.currentQuestionIndex]?.cardID;

  React.useEffect(() => {
    if (channel == null) {
      return;
    }

    const client = Client({
      options: {
        debug: process.env.NODE_ENV === "development",
      },
      connection: {
        secure: true,
        reconnect: true,
      },
      channels: [channel],
    });

    client.connect();

    client.on("message", (channel, userstate, message) => {
      if (userstate["display-name"] == null) {
        return;
      }

      const bestMatch = fuse.search(message)[0];

      if (bestMatch?.item.id !== correctAnswerRef.current) {
        debug(
          `${userstate["display-name"]} from the Twitch chat made a mistake, they're forgiven`
        );
        return;
      }

      debug(
        `${userstate["display-name"]} from the Twitch chat made a successful attempt`
      );
      dispatch({
        type: "answer",
        username: userstate["display-name"],
        cardID: bestMatch.item.id,
      });
    });

    return () => {
      client.disconnect();
    };
  }, [channel, dispatch, fuse]);

  return <CurrentPhase gameState={gameState} dispatch={dispatch} />;
}
