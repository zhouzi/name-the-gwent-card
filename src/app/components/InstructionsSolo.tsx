import * as React from "react";
import { Link as RouterLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Panel, Heading, Paragraph, Button, Link } from "design";
import ROUTES from "app/ROUTES";
import GAME_RULES from "app/GAME_RULES";

import Footer from "./Footer";

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
        <Heading>
          <FormattedMessage id="instructions" defaultMessage="Instructions" />
        </Heading>
        <Paragraph>
          <FormattedMessage
            id="rules"
            defaultMessage="You have {seconds} seconds to guess the name of a Gwent card. If the answer is correct, the next card will be zoomed in a bit more. So the better you get, the harder it becomes."
            values={{ seconds: GAME_RULES.TIME_PER_CARD / 1000 }}
          />
        </Paragraph>
        <Paragraph>
          <FormattedMessage
            id="cardsOrigin"
            defaultMessage="The cards list come from <leviathan>Team Leviathan</leviathan>'s <meta>meta report</meta> so they're all played in the current meta."
            values={{
              leviathan: (children: string) => (
                <Link href="https://teamleviathangaming.com/">{children}</Link>
              ),
              meta: (children: string) => (
                <Link href="https://teamleviathangaming.com/meta/">
                  {children}
                </Link>
              ),
            }}
          />
        </Paragraph>
        <Actions>
          <Button as={RouterLink} to={ROUTES.PLAY}>
            <FormattedMessage id="play" defaultMessage="Play" />
          </Button>
        </Actions>
      </Panel>
      <Footer />
    </Container>
  );
}
