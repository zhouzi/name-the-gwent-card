import * as React from "react";
import styled from "styled-components";
import Panel from "./Panel";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Footer from "./Footer";
import InputGroup from "./InputGroup";
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
          taken from your Twitch chat. The first viewer to send the correct
          answer will be credited here.
        </Paragraph>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            alert("Sorry, this feature is currently in development.");
          }}
        >
          <Paragraph as="label" htmlFor="channel">
            What is the url of your Twitch channel?
          </Paragraph>
          <InputGroup>
            <Input
              type="text"
              id="channel"
              placeholder="https://www.twitch.tv/{your channel}"
            />
            <Button type="submit">Play</Button>
          </InputGroup>
        </form>
      </Panel>
      <Footer />
    </Container>
  );
}
