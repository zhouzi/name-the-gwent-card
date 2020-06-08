import * as React from "react";
import createDebug from "debug";
import { GameState, Action } from "app/GameState";

const debug = createDebug("PhaseLoading");

interface Props {
  gameState: GameState;
  dispatch: React.Dispatch<Action>;
}

function preloadImages(images: string[], signal: AbortSignal) {
  return new Promise((resolve, reject) => {
    if (images.length === 0) {
      debug("All images have been loaded, resolving");

      resolve();
      return;
    }

    const head = images[0];
    const tail = images.slice(1);

    const image = window.document.createElement("img");

    const onAbort = () => {
      debug(`Loading ${head} has been aborted, rejecting now`);

      image.removeEventListener("load", onLoad);
      reject();
    };
    const onLoad = () => {
      debug(`Loaded ${head}`);

      signal.removeEventListener("abort", onAbort);
      resolve(preloadImages(tail, signal));
    };

    signal.addEventListener("abort", onAbort);
    image.addEventListener("load", onLoad);

    debug(`Loading ${head}`);
    image.src = head;
  });
}

export function PhaseLoading({ gameState, dispatch }: Props) {
  React.useEffect(() => {
    const controller = new AbortController();

    preloadImages(
      gameState.questions.map(
        (question) => `https://playgwent.com${question.card.previewImg.big}`
      ),
      controller.signal
    ).then(() => {
      dispatch({
        type: "loaded",
      });
    });

    return () => {
      controller.abort();
    };
  }, [gameState.questions, dispatch]);

  return <div />;
}
