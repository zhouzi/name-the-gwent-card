import styled, { css } from "styled-components";
import { Paragraph } from "./Paragraph";

export const ButtonList = styled(Paragraph).attrs({ variant: "text" })`
  & > *:not(:last-child) {
    margin-right: 0.4rem;
  }
`;

export const Button = styled.button<{
  variant?: "primary" | "outline";
  size?: "normal" | "small";
}>`
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border: none;
  text-decoration: none;
  display: inline-block;

  cursor: pointer;
  border: 1px solid transparent;

  &[disabled] {
    pointer-events: none;
    opacity: 0.8;
  }

  ${(props) => {
    switch (props.variant) {
      case "outline":
        return css`
          &:focus,
          &:hover {
            color: ${props.theme.colors.primary.main};
            background-color: ${props.theme.colors.background.light};
          }
        `;
      case "primary":
      default:
        return css`
          color: ${props.theme.colors.primary.main};
          border-color: ${props.theme.colors.primary.main};

          &:focus,
          &:hover {
            background-color: ${props.theme.colors.primary.lighter};
          }
        `;
    }
  }}

  ${(props) => {
    switch (props.size) {
      case "small":
        return css`
          padding: ${props.theme.spacing.small} ${props.theme.spacing.normal};
        `;
      case "normal":
      default:
        return css`
          padding: ${props.theme.spacing.normal} ${props.theme.spacing.large};
        `;
    }
  }}
`;
