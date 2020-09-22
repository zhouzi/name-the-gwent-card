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

  @media ${(props) => props.theme.breakpoints.up("small")} {
    flex-direction: row;
    perspective: 1500px;
  }
`;

const QuestionPanelContainer = styled.div`
  position: relative;
  z-index: 1;
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
  @media ${(props) => props.theme.breakpoints.up("small")} {
    padding-left: calc(
      ${(props) => props.theme.spacing.large} +
        ${(props) => props.theme.spacing.normal}
    );
  }
`;

const AutocompleteContainer = styled.div`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing.normal};
`;

export function PhaseInProgress({ gameState, dispatch }: Props) {
  const intl = useIntl();
  const { fuse, cards } = useLocaleContext();
  const difficulty = DIFFICULTIES[gameState.difficultyLevel];
  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const currentQuestionCard = cards.find(
    (card) => card.id === currentQuestion.cardID
  )!;
  const currentQuestionAnswer =
    gameState.answers[gameState.currentQuestionIndex];

  const onQuestionTimeout = React.useCallback(() => {
    dispatch({
      type: "answer",
      cardID: null,
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
          card={currentQuestionCard}
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
                        cardID: selectedItem ? selectedItem.id : null,
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
                    <CardHints card={currentQuestionCard} />
                  </form>
                )}
              </Downshift>
            ) : (
              <>
                {currentQuestionAnswer.cardID === currentQuestion.cardID ? (
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
                          localizedName: currentQuestionCard.localizedName,
                        }}
                      />
                    </Paragraph>
                  </>
                ) : (
                  <>
                    <Heading>
                      <FormattedMessage id="lost" />
                    </Heading>
                    {currentQuestionAnswer.cardID == null ||
                    cards.find(
                      (card) => card.id === currentQuestionAnswer.cardID
                    ) == null ? (
                      <Paragraph>
                        <FormattedMessage
                          id="cardNamed"
                          values={{
                            localizedName: currentQuestionCard.localizedName,
                          }}
                        />
                      </Paragraph>
                    ) : (
                      <Paragraph>
                        <FormattedMessage
                          id="butCardNamed"
                          values={{
                            wrongLocalizedName: cards.find(
                              (card) => card.id === currentQuestionAnswer.cardID
                            )!.localizedName,
                            correctLocalizedName:
                              currentQuestionCard.localizedName,
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
