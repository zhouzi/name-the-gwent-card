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
  createQuestions,
  serialize,
  DIFFICULTIES,
  DifficultyLevel,
} from "app/GameState";
import { useLocaleContext } from "app/i18n";
import { Footer } from "app/components/Footer";
import { ROUTES } from "./ROUTES";

export function RouteInstructions() {
  const history = useHistory();
  const { cards } = useLocaleContext();
  const [difficultyLevel, setDifficultyLevel] = React.useState<DifficultyLevel>(
    "easy"
  );

  return (
    <Container>
      <Panel>
        <Heading>
          <FormattedMessage id="instructions" />
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
          {DIFFICULTIES.map((difficulty) => (
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
              generatePath(ROUTES.PLAY, {
                gameRules: serialize({
                  difficultyLevel,
                  questions: createQuestions(cards),
                }),
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
