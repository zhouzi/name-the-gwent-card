import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { themeCSSVariables } from "design/theme";
import { GlobalStyle } from "design/components";

const Paragraph = styled.p``;

export function App() {
  return (
    <ThemeProvider theme={themeCSSVariables}>
      <GlobalStyle />
      <Paragraph>hello world</Paragraph>
    </ThemeProvider>
  );
}
