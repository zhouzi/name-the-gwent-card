import * as React from "react";
import styled, { css } from "styled-components";

interface Props {
  duration: number;
  onTimeout: () => void;
}

const LifebarContainer = styled.div<{
  variant: "success" | "warning" | "danger";
}>`
  height: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: skew(-20deg);
  margin-bottom: ${(props) => props.theme.spacing.normal};
  transition: 300ms ease-out;
  transition-property: background-color, box-shadow;

  ${(props) => {
    switch (props.variant) {
      case "danger":
        return css`
          background-color: ${props.theme.colors.danger.main};
          box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.3),
            0 0 6px ${props.theme.colors.danger.main};
        `;
      case "warning":
        return css`
          background-color: ${props.theme.colors.warning.main};
          box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.3),
            0 0 6px ${props.theme.colors.warning.main};
        `;
      case "success":
      default:
        return css`
          background-color: ${props.theme.colors.success.main};
          box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.3),
            0 0 6px ${props.theme.colors.success.main};
        `;
    }
  }}
`;

function getWidth(startedAt: Date, duration: number): number {
  return Math.min(
    100,
    Math.max(0, ((Date.now() - startedAt.getTime()) / duration) * 100)
  );
}

export function Lifebar({ duration, onTimeout }: Props) {
  const [startedAt] = React.useState(new Date());
  const [width, setWidth] = React.useState(getWidth(startedAt, duration));

  React.useEffect(() => {
    let requestId: number | null = null;

    (function update() {
      setWidth(getWidth(startedAt, duration));

      if (Date.now() >= startedAt.getTime() + duration) {
        onTimeout();
        requestId = null;
        return;
      }

      requestId = window.requestAnimationFrame(update);
    })();

    return () => {
      if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = null;
      }
    };
  }, [startedAt, duration, onTimeout]);

  const remainingWidth = 100 - width;

  return (
    <LifebarContainer
      variant={
        remainingWidth > 40
          ? "success"
          : remainingWidth > 20
          ? "warning"
          : "danger"
      }
      style={{ width: `${remainingWidth}%` }}
    />
  );
}
