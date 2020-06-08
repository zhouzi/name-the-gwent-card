import styled, { css } from "styled-components";

export const AutocompleteList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  z-index: 10;
  top: 100%;
  left: 0;
  width: 100%;
`;

export const AutocompleteListItem = styled.li<{
  highlighted: boolean;
  selected: boolean;
}>`
  font-weight: ${(props) => (props.selected ? "700" : "400")};
  padding: ${(props) =>
    [
      props.theme.spacing.normal,
      props.theme.spacing.large,
      props.theme.spacing.normal,
      props.theme.spacing.normal,
    ].join(" ")};
  background-color: ${(props) => props.theme.colors.background.light};

  ${(props) =>
    props.highlighted &&
    css`
      color: ${(props) => props.theme.colors.primary.main};
      background-color: ${(props) => props.theme.colors.primary.lighter};
    `}
`;
