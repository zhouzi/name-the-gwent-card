import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import Panel from "./Panel";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Footer from "./Footer";
import Button from "./Button";

const Container = styled.section`
  max-width: 40rem;
  width: 100%;
`;

export default function InstructionsSolo() {
  return (
    <Container>
      <Panel>
        <Heading>Instructions</Heading>
        <Paragraph>
          You will be shown a Gwent card, your goal is to guess its name.
          Everytime you succeed, the next card will be zoomed in a little more,
          making them harder and harder to guess.
        </Paragraph>
        <Paragraph>Oh, and obviously you have limited time.</Paragraph>
        <Button as={RouterLink} to="/play">
          Play
        </Button>
      </Panel>
      <Footer />
    </Container>
  );
}
