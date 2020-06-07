import styled from "styled-components";

export const Heading = styled.h1`
  font-size: 2rem;
  font-family: ${(props) => props.theme.fonts.heading};
  line-height: 1.2;
  font-weight: 700;
  margin: 0 0 ${(props) => props.theme.spacing.normal} 0;
`;
