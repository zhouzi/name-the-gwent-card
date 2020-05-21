import * as React from "react";
import styled from "styled-components";

const LifebarContainer = styled.div`
  height: 6px;
  transform: skew(-25deg);
  background-color: #21bf6f;
  border: 1px solid #19ad62;
  box-shadow: inset 0 2px 0 #35d685, 0 0 10px #21bf6f;
  margin-bottom: 1rem;
`;

interface Props {
  startedAt: Date;
  endsAt: Date;
}

export default function Lifebar({ startedAt, endsAt }: Props) {
  const [width, setWidth] = React.useState(100);

  React.useEffect(() => {
    let requestId: number | null = null;

    (function update() {
      setWidth(
        ((endsAt.getTime() - Date.now()) /
          (endsAt.getTime() - startedAt.getTime())) *
          100
      );
      requestId = window.requestAnimationFrame(update);
    })();

    return () => {
      if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = null;
      }
    };
  }, [startedAt, endsAt, setWidth]);

  return <LifebarContainer style={{ width: `${width}%` }} />;
}
