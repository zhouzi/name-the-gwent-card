import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
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
  const intl = useIntl();
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
        <Heading>
          <FormattedMessage id="gameOver" />
        </Heading>
        <Paragraph>
          <FormattedMessage
            id="gameOverSummary"
            values={{
              correctAnswers,
              totalQuestions: props.gameState.questions.length,
            }}
          />
        </Paragraph>
        <ButtonList>
          <Button
            as="a"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              intl.formatMessage(
                { id: "tweetText" },
                {
                  correctAnswers,
                  totalQuestions: props.gameState.questions.length,
                }
              )
            )}&url=${encodeURIComponent(window.location.href)}&via=zh0uzi`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FormattedMessage id="tweet" />
          </Button>
          <Button as={Link} to={ROUTES.INSTRUCTIONS}>
            <FormattedMessage id="playAgain" />
          </Button>
        </ButtonList>
      </Panel>
      <Footer />
    </Container>
  );
}
