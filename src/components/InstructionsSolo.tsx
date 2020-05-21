import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import GAME_RULES from "../GAME_RULES";
import Panel from "./Panel";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Footer from "./Footer";
import Button from "./Button";

const Container = styled.section`
  max-width: 40rem;
  width: 100%;
`;

const Actions = styled.div`
  padding-top: 1rem;
`;

export default function InstructionsSolo() {
  return (
    <Container>
      <Panel>
        <Heading>Instructions</Heading>
        <Paragraph>
          You have {GAME_RULES.TIME_PER_CARD / 1000} seconds to guess the name
          of a Gwent card. If the answer is correct, the next card will be
          zoomed in a bit more. So the better you get, the harder it becomes.
        </Paragraph>
        <Actions>
          <Button as={RouterLink} to="/play">
            Play
          </Button>
        </Actions>
      </Panel>
      <Footer />
    </Container>
  );
}
