import * as React from "react";
import { useImmerReducer } from "use-immer";
import createDebug from "debug";
import { Client } from "tmi.js";
import { reducer, getInitialState, GameRules } from "app/GameState";
import { useLocaleContext } from "app/i18n";
import { PhaseGameOver } from "./PhaseGameOver";
import { PhaseInProgress } from "./PhaseInProgress";
import { PhaseLoading } from "./PhaseLoading";

const debug = createDebug("Game");

const PHASES = {
  loading: PhaseLoading,
  inProgress: PhaseInProgress,
  gameOver: PhaseGameOver,
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
  const CurrentPhase = PHASES[gameState.phase];

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
      const bestMatch = fuse.search(message)[0];

      if (
        bestMatch == null ||
        bestMatch.score == null ||
        bestMatch.score > 0.4
      ) {
        debug(
          `${userstate["display-name"]} made an attempt that didn't find a close match`
        );
        return;
      }

      debug(
        `${userstate["display-name"]}'s attempt has a close match, their answer has been submitted`
      );
      dispatch({
        type: "answer",
        username: userstate["display-name"] || null,
        cardID: bestMatch.item.id,
      });
    });

    return () => {
      client.disconnect();
    };
  }, [channel, dispatch, fuse]);

  return <CurrentPhase gameState={gameState} dispatch={dispatch} />;
}
