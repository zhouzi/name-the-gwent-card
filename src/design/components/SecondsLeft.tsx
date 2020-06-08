import * as React from "react";

interface Props {
  duration: number;
  onTimeout: () => void;
}

function getSecondsLeft(startedAt: Date, duration: number): number {
  return Math.round((duration - (Date.now() - startedAt.getTime())) / 1000);
}

export function SecondsLeft({ duration, onTimeout }: Props) {
  const [startedAt] = React.useState(new Date());
  const [secondsLeft, setSecondsLeft] = React.useState(
    getSecondsLeft(startedAt, duration)
  );

  React.useEffect(() => {
    let timeoutId: number | null = null;

    (function update() {
      setSecondsLeft(getSecondsLeft(startedAt, duration));

      if (Date.now() >= startedAt.getTime() + duration) {
        timeoutId = null;
        onTimeout();
        return;
      }

      timeoutId = setTimeout(update, 1000);
    })();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  }, [startedAt, duration, onTimeout]);

  return <>{secondsLeft}</>;
}
