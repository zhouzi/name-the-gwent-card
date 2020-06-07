import styled from "styled-components";
import frame from "design/assets/frame.png";

export const Panel = styled.div`
  position: relative;
  background: ${(props) => props.theme.colors.background.dark};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  padding: ${(props) => props.theme.spacing.large};

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-width: 12px;
    border-style: solid;
    border-image-source: url(${frame});
    border-image-slice: 12;
    border-image-outset: 0;
    border-image-repeat: round;
    pointer-events: none;
  }
`;
