import styled, { css } from "styled-components";

interface Props {
  variant?: "text" | "hint";
  spacingBottom?: "normal" | "large";
}

export const Paragraph = styled.p<Props>`
  margin: 0 0 ${(props) => props.theme.spacing[props.spacingBottom || "normal"]}
    0;

  ${(props) =>
    props.variant === "hint" &&
    css`
      font-size: 0.9rem;
      color: ${props.theme.colors.text.light};
    `}

  &:last-child {
    margin-bottom: 0;
  }
`;
