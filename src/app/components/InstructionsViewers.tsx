import * as React from "react";
import { useHistory } from "react-router-dom";
import { useIntl, FormattedMessage } from "react-intl";
import styled from "styled-components";
import { Client } from "tmi.js";
import {
  Panel,
  Heading,
  Paragraph,
  InputGroup,
  Input,
  Button,
} from "../../designSystem";
import Footer from "./Footer";

const Container = styled.section`
  max-width: 40rem;
  width: 100%;
`;

const Alert = styled.div`
  margin-top: 0.4rem;
  color: #d22a2a;
`;

enum StatusType {
  Idle = "Idle",
  Connecting = "Connecting",
  Failed = "Failed",
}

type Status =
  | { type: StatusType.Idle }
  | { type: StatusType.Connecting }
  | { type: StatusType.Failed; message: string };

function formatChannel(input: string): string {
  const regex = /https?:\/\/(?:www\.)?twitch\.tv\/([^/]+)/;
  const matches = input.match(regex);

  if (matches) {
    return matches[1];
  }

  return input;
}

export default function InstructionsViewers() {
  const [input, setInput] = React.useState("");
  const [status, setStatus] = React.useState<Status>({ type: StatusType.Idle });
  const history = useHistory();
  const intl = useIntl();

  return (
    <Container>
      <Panel>
        <Heading>
          <FormattedMessage
            id="playWithViewers"
            defaultMessage="Pay with your viewers"
          />
        </Heading>
        <Paragraph>
          <FormattedMessage
            id="rulesViewers"
            defaultMessage="The game is the same. The only difference is that the answers are taken from your Twitch chat. The first viewer to send the correct answer will be credited here."
          />
        </Paragraph>
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            setStatus({ type: StatusType.Connecting });

            const channel = formatChannel(input);

            const client = Client({
              connection: {
                secure: true,
                reconnect: true,
              },
            });

            await client.connect();

            try {
              await client.join(channel);
              await client.disconnect();

              history.push(`/play/${channel}`);
            } catch (err) {
              await client.disconnect();

              setStatus({
                type: StatusType.Failed,
                message: intl.formatMessage(
                  {
                    id: "connectionFailure",
                    defaultMessage:
                      'Could not connect to the Twitch channel "{channel}". Make sure that you typed the name correctly and that it\'s currently online.',
                  },
                  {
                    channel: formatChannel(input),
                  }
                ),
              });
            }
          }}
        >
          <Paragraph as="label" htmlFor="channel">
            <FormattedMessage
              id="whatTwitchChannel"
              defaultMessage="What is your Twitch channel? https://twitch.tv/'{your channel}'"
            />
          </Paragraph>
          <InputGroup>
            <Input
              type="text"
              id="channel"
              placeholder="Your channel..."
              onChange={(event) => setInput(event.currentTarget.value)}
              value={input}
              required
            />
            <Button
              type="submit"
              disabled={status.type === StatusType.Connecting}
            >
              {status.type === StatusType.Connecting ? (
                <FormattedMessage id="connecting" defaultMessage="Connecting" />
              ) : (
                <FormattedMessage id="play" defaultMessage="Play" />
              )}
            </Button>
          </InputGroup>
          {status.type === StatusType.Failed && <Alert>{status.message}</Alert>}
        </form>
      </Panel>
      <Footer />
    </Container>
  );
}
