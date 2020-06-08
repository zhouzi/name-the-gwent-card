import * as React from "react";
import { useHistory, generatePath } from "react-router-dom";
import {
  Container,
  Panel,
  Heading,
  Paragraph,
  Button,
} from "design/components";
import { createQuestions, serialize } from "app/GameState";
import { useLocaleContext } from "app/i18n";
import { Footer } from "app/components/Footer";
import { ROUTES } from "./ROUTES";

export function RouteInstructions() {
  const history = useHistory();
  const { cards } = useLocaleContext();

  return (
    <Container>
      <Panel>
        <Heading>Instructions</Heading>
        <Paragraph spacingBottom="large">
          You will be shown a random Gwent card with visual effects applied to
          it. Your goal is to name the card in a limited time.
        </Paragraph>
        <Button
          type="button"
          onClick={() => {
            history.push(
              generatePath(ROUTES.PLAY, {
                questions: serialize(createQuestions(cards)),
              })
            );
          }}
        >
          Play
        </Button>
      </Panel>
      <Footer />
    </Container>
  );
}
