import styled from "styled-components";

interface Props {
  spacingBottom?: "normal" | "large";
}

export const Paragraph = styled.p<Props>`
  margin: 0 0 ${(props) => props.theme.spacing[props.spacingBottom || "normal"]}
    0;

  &:last-child {
    margin-bottom: 0;
  }
`;
