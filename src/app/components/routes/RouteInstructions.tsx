import * as React from "react";
import { useHistory, generatePath } from "react-router-dom";
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
        <Heading>Instructions</Heading>
        <Paragraph>
          In this mini game, your goal is to name a random Gwent card from its
          illustration. The cards used in this game come from{" "}
          <Link href="https://teamleviathangaming.com/">Team Leviathan</Link>
          's latest{" "}
          <Link href="https://teamleviathangaming.com/meta/">meta report</Link>.
          It's a great way to improve while having fun!
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
                <strong>{difficulty.difficultyLevel}</strong>:{" "}
                {difficulty.difficultyLevel === "easy"
                  ? "illustrations are not obfuscated and you are given hints."
                  : difficulty.difficultyLevel === "medium"
                  ? "illustrations are slightly obfuscated, no hints."
                  : difficulty.difficultyLevel === "hard"
                  ? "illustrations are strongly obfuscated, no hints."
                  : "illustrations are extremely obfuscated, no hints."}
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
          Play
        </Button>
      </Panel>
      <Footer />
    </Container>
  );
}
