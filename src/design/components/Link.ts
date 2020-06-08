import styled from "styled-components";

export const Link = styled.a`
  color: inherit;
  font: inherit;
  background: transparent;
  padding: 0;
  margin: 0;
  border: none;
  display: inline;

  cursor: pointer;
  color: ${(props) => props.theme.colors.primary.main};
  text-decoration: underline;
`;
