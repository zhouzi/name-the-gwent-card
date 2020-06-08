import * as React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Heading,
  Paragraph,
  Panel,
  Button,
  ButtonList,
} from "design/components";
import { GameState, Action } from "app/GameState";
import { ROUTES } from "app/components/routes";
import { Footer } from "../Footer";

interface Props {
  gameState: GameState;
  dispatch: React.Dispatch<Action>;
}

export function PhaseGameOver(props: Props) {
  const correctAnswers = props.gameState.answers.reduce(
    (acc, answer, index) => {
      if (answer.id === props.gameState.questions[index].card.id) {
        return acc + 1;
      }

      return acc;
    },
    0
  );

  return (
    <Container>
      <Panel>
        <Heading>Game Over!</Heading>
        <Paragraph>
          You had {correctAnswers} correct answers out of{" "}
          {props.gameState.questions.length}. Feeling proud? Let the world know!
        </Paragraph>
        <ButtonList>
          <Button
            as="a"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `I just named ${correctAnswers} Gwent cards out of the ${props.gameState.questions.length} random ones. Beat me to it!`
            )}&url=${encodeURIComponent(window.location.href)}&via=zh0uzi`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweet
          </Button>
          <Button as={Link} to={ROUTES.INSTRUCTIONS}>
            Play Again
          </Button>
        </ButtonList>
      </Panel>
      <Footer />
    </Container>
  );
}
