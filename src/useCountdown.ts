import * as React from "react";

interface State {
  startedAt: Date;
  stoppedAt: Date | null;
  timeLeft: number;
}

function useCountdown(maxTime: number) {
  const [state, setState] = React.useState<State>({
    startedAt: new Date(),
    stoppedAt: null,
    timeLeft: maxTime,
  });
  const isStopped = state.stoppedAt || state.timeLeft <= 0;

  React.useEffect(() => {
    if (isStopped) {
      return;
    }

    let timeoutId: number | null = null;

    (function update() {
      timeoutId = window.setTimeout(
        () => {
          setState((currentState) => ({
            ...currentState,
            timeLeft: maxTime - (Date.now() - currentState.startedAt.getTime()),
          }));
          update();
        },
        // performance might suffer from such regular timeout calls
        // ideally, only the progress bar should be updated very often (e.g using requestAnimationFrame)
        // other than that, we just need to know when it's over
        50
      );
    })();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  }, [maxTime, isStopped, setState]);

  return {
    isStopped,
    timeLeft: state.timeLeft,
    stop: () => {
      setState((currentState) => ({
        ...currentState,
        stoppedAt: new Date(),
      }));
    },
    restart: () => {
      setState({
        startedAt: new Date(),
        stoppedAt: null,
        timeLeft: maxTime,
      });
    },
  };
}

export default useCountdown;
