import * as React from "react";

function useCountdown(maxTime: number) {
  const [state, setState] = React.useState({
    startedAt: new Date(),
    timeLeft: maxTime,
  });
  const isStopped = state.timeLeft <= 0;

  React.useEffect(() => {
    if (isStopped) {
      return;
    }

    let timeoutId: number | null = null;

    (function update() {
      timeoutId = window.setTimeout(() => {
        setState((currentState) => ({
          ...currentState,
          timeLeft: maxTime - (Date.now() - currentState.startedAt.getTime()),
        }));
        update();
      }, 1000);
    })();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  }, [maxTime, isStopped, setState]);

  return {
    timeLeft: state.timeLeft,
    restart: () => {
      setState({
        startedAt: new Date(),
        timeLeft: maxTime,
      });
    },
  };
}

export default useCountdown;
