import * as React from "react";
import { useHistory, generatePath } from "react-router-dom";
import { FormattedMessage } from "react-intl";
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
} from "design/components";
import {
  getRandomCards,
  serialize,
  DIFFICULTIES,
  DifficultyLevel,
} from "app/GameState";
import { useLocaleContext } from "app/i18n";
import { Footer } from "app/components/Footer";
import { ROUTES } from "./ROUTES";

export function RouteInstructionsSolo() {
  const history = useHistory();
  const { cards } = useLocaleContext();
  const [difficultyLevel, setDifficultyLevel] = React.useState<DifficultyLevel>(
    DifficultyLevel.Easy
  );

  return (
    <Container>
      <Panel>
        <Heading>
          <FormattedMessage id="playSolo" />
        </Heading>
        <Paragraph>
          <FormattedMessage
            id="gameInstructions"
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
        <Button
          type="button"
          onClick={() => {
            history.push(
              generatePath(ROUTES.SOLO_PLAY, {
                gameRules: serialize([
                  difficultyLevel,
                  getRandomCards(cards).map((card) => card.id),
                ]),
              })
            );
          }}
        >
          <FormattedMessage id="play" />
        </Button>
      </Panel>
      <Footer />
    </Container>
  );
}
