import * as React from "react";
import styled from "styled-components";
import Panel from "./Panel";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Footer from "./Footer";
import Input from "./Input";
import Button from "./Button";

const Container = styled.section`
  max-width: 40rem;
  width: 100%;
`;

export default function InstructionsViewers() {
  return (
    <Container>
      <Panel>
        <Heading>Play with your viewers</Heading>
        <Paragraph>
          The game is the same. The only difference is that the answers are
          submitted in your Twitch chat instead of here in your browser. So you
          can stream this window and enjoy it with your viewers.
        </Paragraph>
        <Paragraph as="label" htmlFor="channel">
          What's your Twitch channel?
        </Paragraph>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            alert("Sorry, this feature is currently in development.");
          }}
        >
          <Input type="text" id="channel" placeholder="Channel name..." />
          <Button type="submit">Play</Button>
        </form>
      </Panel>
      <Footer />
    </Container>
  );
}
