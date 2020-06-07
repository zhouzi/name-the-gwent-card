import * as React from "react";
import { ThemeProvider } from "styled-components";
import { themeCSSVariables } from "design/theme";
import {
  GlobalStyle,
  Container,
  FireSparks,
  Panel,
  Heading,
  Paragraph,
  Button,
} from "design/components";
import { Footer } from "./Footer";

export function App() {
  return (
    <ThemeProvider theme={themeCSSVariables}>
      <GlobalStyle />
      <FireSparks />
      <Container>
        <Panel>
          <Heading>Instructions</Heading>
          <Paragraph spacingBottom="large">
            You will be shown a random Gwent card with visual effects applied to
            it. Your goal is to name the card in a limited time.
          </Paragraph>
          <Button>Play</Button>
        </Panel>
        <Footer />
      </Container>
    </ThemeProvider>
  );
}
