import * as React from "react";
import { useHistory, generatePath } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { Client } from "tmi.js";
import {
  Container,
  Panel,
  Heading,
  Paragraph,
  Button,
  List,
  ListItem,
  InputRadio,
  Link,
  InputGroup,
  Input,
  InputHint,
} from "design/components";
import {
  createQuestions,
  serialize,
  DIFFICULTIES,
  DifficultyLevel,
} from "app/GameState";
import { useLocaleContext } from "app/i18n";
import { Footer } from "app/components/Footer";
import { ROUTES } from "./ROUTES";

function formatChannel(input: string): string {
  const regex = /https?:\/\/(?:www\.)?twitch\.tv\/([^/]+)/;
  const matches = input.match(regex);

  if (matches) {
    return matches[1];
  }

  return input;
}

export function RouteInstructionsTwitch() {
  const history = useHistory();
  const intl = useIntl();
  const { cards } = useLocaleContext();
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const [difficultyLevel, setDifficultyLevel] = React.useState<DifficultyLevel>(
    DifficultyLevel.Easy
  );

  return (
    <Container>
      <Panel>
        <Heading>
          <FormattedMessage id="playWithTwitchChat" />
        </Heading>
        <Paragraph>
          <FormattedMessage
            id="gameInstructionsTwitchChat"
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
        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const channel = formatChannel(input);

            if (!channel) {
              setError(
                new Error(intl.formatMessage({ id: "channelRequired" }))
              );
              return;
            }

            setLoading(true);
            setError(null);

            const client = Client({
              options: {
                debug: process.env.NODE_ENV === "development",
              },
              connection: {
                secure: true,
                reconnect: true,
              },
            });

            try {
              await client.connect();
              await client.join(channel);
              await client.disconnect();

              history.push(
                generatePath(ROUTES.TWITCH_PLAY, {
                  channel,
                  gameRules: serialize([
                    difficultyLevel,
                    createQuestions(cards).map((question) => question.cardID),
                  ]),
                })
              );
            } catch (err) {
              console.error(err);

              setLoading(false);
              setError(
                new Error(
                  intl.formatMessage({
                    id: "twitchError",
                  })
                )
              );
            }
          }}
        >
          <List spacingBottom="large">
            {[
              DIFFICULTIES[DifficultyLevel.Easy],
              DIFFICULTIES[DifficultyLevel.Medium],
              DIFFICULTIES[DifficultyLevel.Hard],
              DIFFICULTIES[DifficultyLevel.Extreme],
            ].map((difficulty) => (
              <ListItem key={difficulty.difficultyLevel}>
                <InputRadio
                  name="difficulty"
                  value={difficulty.difficultyLevel}
                  onChange={(event) =>
                    setDifficultyLevel(event.target.value as DifficultyLevel)
                  }
                  checked={difficultyLevel === difficulty.difficultyLevel}
                >
                  <FormattedMessage
                    id="difficultyLevel"
                    values={{
                      difficultyLevel: difficulty.difficultyLevel,
                      b: (children: string) => <strong>{children}</strong>,
                    }}
                  />
                </InputRadio>
              </ListItem>
            ))}
          </List>
          <InputGroup>
            <Input
              type="text"
              placeholder="https://twitch.tv/{channel}"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <FormattedMessage id="connecting" />
              ) : (
                <FormattedMessage id="play" />
              )}
            </Button>
          </InputGroup>
          {error && <InputHint variant="error">{error.message}</InputHint>}
        </form>
      </Panel>
      <Footer />
    </Container>
  );
}
