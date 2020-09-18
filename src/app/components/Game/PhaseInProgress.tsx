import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import Downshift from "downshift";
import { useLocaleContext } from "app/i18n";
import { GameState, Action, DIFFICULTIES } from "app/GameState";
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
  AutocompleteList,
  AutocompleteListItem,
} from "design/components";
import { CardWithVisualEffects } from "./CardWithVisualEffects";
import { CardHints } from "./CardHints";
import { Footer } from "../Footer";

interface Props {
  gameState: GameState;
  dispatch: React.Dispatch<Action>;
}

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 1500px;

  @media ${(props) => props.theme.breakpoints.up("small")} {
    flex-direction: row;
  }
`;

const QuestionPanelContainer = styled.div`
  position: relative;
  z-index: 2;
  margin-top: calc(-1 * ${(props) => props.theme.spacing.large});

  @media ${(props) => props.theme.breakpoints.up("small")} {
    z-index: 0;
    margin-top: 0;
    margin-left: calc(-1 * ${(props) => props.theme.spacing.large});
  }
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

const AutocompleteContainer = styled.div`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing.normal};
`;

export function PhaseInProgress({ gameState, dispatch }: Props) {
  const intl = useIntl();
  const { fuse, cards } = useLocaleContext();
  const difficulty = DIFFICULTIES.find(
    (otherDifficulty) =>
      otherDifficulty.difficultyLevel === gameState.difficultyLevel
  )!;
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
          visualEffects={
            currentQuestionAnswer == null ? difficulty.visualEffects : []
          }
        />
        <QuestionPanelContainer>
          <QuestionPanel>
            {currentQuestionAnswer == null ? (
              <Downshift itemToString={(card) => card?.localizedName || ""}>
                {({
                  getRootProps,
                  getLabelProps,
                  getInputProps,
                  getMenuProps,
                  getItemProps,
                  inputValue,
                  highlightedIndex,
                  selectedItem,
                  isOpen,
                }) => (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();

                      dispatch({
                        type: "answer",
                        id: selectedItem ? selectedItem.id : null,
                        username: null,
                      });
                    }}
                    autoComplete="off"
                  >
                    <Heading as="label" {...getLabelProps()}>
                      <FormattedMessage id="questionLabel" />
                    </Heading>
                    <Lifebar duration={30000} onTimeout={onQuestionTimeout} />
                    <AutocompleteContainer
                      {...getRootProps(
                        { refKey: "ref" },
                        { suppressRefError: true }
                      )}
                    >
                      <InputGroup>
                        <Input
                          {...getInputProps()}
                          placeholder={intl.formatMessage({
                            id: "placeholder",
                          })}
                          autoFocus
                        />
                        <Button>
                          <FormattedMessage id="submit" />
                        </Button>
                      </InputGroup>
                      <AutocompleteList {...getMenuProps()}>
                        {isOpen &&
                          inputValue &&
                          fuse
                            .search(inputValue)
                            .slice(0, 3)
                            .map((match) => match.item)
                            .map((card, index) => (
                              <AutocompleteListItem
                                {...getItemProps({
                                  index,
                                  key: card.id,
                                  item: card,
                                })}
                                highlighted={highlightedIndex === index}
                                selected={selectedItem?.id === card.id}
                              >
                                {card.localizedName}
                              </AutocompleteListItem>
                            ))}
                      </AutocompleteList>
                    </AutocompleteContainer>
                    {difficulty.hints && (
                      <CardHints card={currentQuestion.card} />
                    )}
                  </form>
                )}
              </Downshift>
            ) : (
              <>
                {currentQuestionAnswer.id === currentQuestion.card.id ? (
                  <>
                    <Heading>
                      {currentQuestionAnswer.username ? (
                        <FormattedMessage
                          id="wonUsername"
                          values={{ username: currentQuestionAnswer.username }}
                        />
                      ) : (
                        <FormattedMessage id="won" />
                      )}
                    </Heading>
                    <Paragraph>
                      <FormattedMessage
                        id="cardNamed"
                        values={{
                          localizedName: currentQuestion.card.localizedName,
                        }}
                      />
                    </Paragraph>
                  </>
                ) : (
                  <>
                    <Heading>
                      <FormattedMessage id="lost" />
                    </Heading>
                    {currentQuestionAnswer.id == null ||
                    cards.find(
                      (card) => card.id === currentQuestionAnswer.id
                    ) == null ? (
                      <Paragraph>
                        <FormattedMessage
                          id="cardNamed"
                          values={{
                            localizedName: currentQuestion.card.localizedName,
                          }}
                        />
                      </Paragraph>
                    ) : (
                      <Paragraph>
                        <FormattedMessage
                          id="butCardNamed"
                          values={{
                            wrongLocalizedName: cards.find(
                              (card) => card.id === currentQuestionAnswer.id
                            )!.localizedName,
                            correctLocalizedName:
                              currentQuestion.card.localizedName,
                          }}
                        />
                      </Paragraph>
                    )}
                  </>
                )}
                <Paragraph variant="hint">
                  <FormattedMessage
                    id="breakTimeLeft"
                    values={{
                      seconds: (
                        <SecondsLeft
                          duration={15000}
                          onTimeout={onBreakTimeout}
                        />
                      ),
                      a: (children: string) => (
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
                          {children}
                        </Link>
                      ),
                    }}
                  />
                </Paragraph>
              </>
            )}
          </QuestionPanel>
          <QuestionFooter />
        </QuestionPanelContainer>
      </QuestionContainer>
    </Container>
  );
}
