import * as React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Panel,
  Heading,
  Paragraph,
  Button,
} from "design/components";
import { Footer } from "app/components/Footer";
import { ROUTES } from "./ROUTES";

export function RouteInstructions() {
  return (
    <Container>
      <Panel>
        <Heading>Instructions</Heading>
        <Paragraph spacingBottom="large">
          You will be shown a random Gwent card with visual effects applied to
          it. Your goal is to name the card in a limited time.
        </Paragraph>
        <Button as={Link} to={ROUTES.PLAY}>
          Play
        </Button>
      </Panel>
      <Footer />
    </Container>
  );
}
