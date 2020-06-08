import styled from "styled-components";

export const Button = styled.button`
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border: none;
  text-decoration: none;
  display: inline-block;

  cursor: pointer;
  padding: ${(props) => props.theme.spacing.normal}
    ${(props) => props.theme.spacing.large};
  color: ${(props) => props.theme.colors.primary.main};
  border: 1px solid ${(props) => props.theme.colors.primary.main};

  &:focus,
  &:hover {
    background-color: ${(props) => props.theme.colors.primary.lighter};
  }

  &[disabled] {
    pointer-events: none;
    opacity: 0.8;
  }
`;