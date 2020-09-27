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

export const InlineList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const InlineListItem = styled.li`
  display: inline-block;

  &:not(:last-child)::after {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    transform: rotateZ(45deg);
    border: 2px solid ${(props) => props.theme.colors.primary.main};
    margin: 0 ${(props) => props.theme.spacing.normal};
  }
`;
