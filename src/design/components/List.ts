import styled from "styled-components";

interface ListProps {
  spacingBottom?: "normal" | "large";
}

export const List = styled.ul<ListProps>`
  padding: 0;
  margin: 0 0 ${(props) => props.theme.spacing[props.spacingBottom || "normal"]}
    0;
  list-style: none;
  color: ${(props) => props.theme.colors.text.light};

  & strong {
    color: ${(props) => props.theme.colors.text.main};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ListItem = styled.li``;
