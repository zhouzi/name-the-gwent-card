import * as React from "react";
import styled from "styled-components";
import { GameState, Action } from "app/GameState";
import {
  Container,
  Panel,
  Heading,
  InputGroup,
  Input,
  Button,
  Paragraph,
  Lifebar,
  SecondsLeft,
  Link,
} from "design/components";
import { CardWithVisualEffects } from "./CardWithVisualEffects";
import { Footer } from "../Footer";

interface Props {
  gameState: GameState;
  dispatch: React.Dispatch<Action>;
}

const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  perspective: 1500px;
`;

const QuestionPanelContainer = styled.div`
  position: relative;
  z-index: 0;
  margin-left: calc(-1 * ${(props) => props.theme.spacing.large});
`;

const QuestionPanel = styled(Panel)`
  padding-left: calc(
    ${(props) => props.theme.spacing.large} +
      ${(props) => props.theme.spacing.normal}
  );
`;

const QuestionFooter = styled(Footer)`
  padding-left: calc(
    ${(props) => props.theme.spacing.large} +
      ${(props) => props.theme.spacing.normal}
  );
`;

export function PhaseInProgress({ gameState, dispatch }: Props) {
  const [input, setInput] = React.useState("");
  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const currentQuestionAnswer =
    gameState.answers[gameState.currentQuestionIndex];

  const onQuestionTimeout = React.useCallback(() => {
    dispatch({
      type: "answer",
      id: null,
      username: null,
    });
  }, [dispatch]);

  const onBreakTimeout = React.useCallback(() => {
    dispatch({
      type: "nextQuestion",
    });
  }, [dispatch]);

  return (
    <Container variant="large">
      <QuestionContainer>
        <CardWithVisualEffects
          card={currentQuestion.card}
          visualEffects={currentQuestion.visualEffects}
        />
        <QuestionPanelContainer>
          <QuestionPanel>
            {currentQuestionAnswer == null ? (
              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  dispatch({
                    type: "answer",
                    id: null,
                    username: null,
                  });
                }}
                autoComplete="off"
              >
                <Heading as="label" htmlFor="userAnswer">
                  What is the name of this card?
                </Heading>
                <Lifebar duration={30000} onTimeout={onQuestionTimeout} />
                <InputGroup>
                  <Input
                    id="userAnswer"
                    onChange={(event) => setInput(event.target.value)}
                    value={input}
                    placeholder="Name this card..."
                    autoFocus
                  />
                  <Button>Submit</Button>
                </InputGroup>
              </form>
            ) : (
              <>
                {currentQuestionAnswer.id === currentQuestion.card.id ? (
                  <>
                    <Heading>Congrats!</Heading>
                    <Paragraph>
                      This card is named {currentQuestion.card.localizedName}.
                    </Paragraph>
                  </>
                ) : (
                  <>
                    <Heading>Nope.</Heading>
                    {currentQuestionAnswer.id == null ? (
                      <Paragraph>
                        This card is named {currentQuestion.card.localizedName}.
                      </Paragraph>
                    ) : (
                      <Paragraph>
                        This card is not named {currentQuestionAnswer.id} but{" "}
                        {currentQuestion.card.localizedName}.
                      </Paragraph>
                    )}
                    <Paragraph variant="hint">
                      <SecondsLeft
                        duration={15000}
                        onTimeout={onBreakTimeout}
                      />{" "}
                      seconds left before the next question (
                      <Link
                        as="button"
                        type="button"
                        onClick={() =>
                          dispatch({
                            type: "nextQuestion",
                          })
                        }
                        autoFocus
                      >
                        skip
                      </Link>
                      ).
                    </Paragraph>
                  </>
                )}
              </>
            )}
          </QuestionPanel>
          <QuestionFooter />
        </QuestionPanelContainer>
      </QuestionContainer>
    </Container>
  );
}
