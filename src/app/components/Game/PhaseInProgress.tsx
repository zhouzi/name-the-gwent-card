import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import Downshift from "downshift";
import { useLocaleContext } from "app/i18n";
import CurrentUser from "app/CurrentUser";
import { GameState, Action, DIFFICULTIES } from "app/GameState";
import {
  Heading,
  InputGroup,
  Input,
  Button,
  Lifebar,
  AutocompleteList,
  AutocompleteListItem,
} from "design/components";
import { CardHints } from "./CardHints";
import { QuestionLayout } from "./QuestionLayout";

interface Props {
  gameState: GameState;
  dispatch: React.Dispatch<Action>;
}

const AutocompleteContainer = styled.div`
  position: relative;
  margin-bottom: ${(props) => props.theme.spacing.normal};
`;

export function PhaseInProgress({ gameState, dispatch }: Props) {
  const intl = useIntl();
  const { fuse, cards } = useLocaleContext();
  const { username: currentUserUsername } = React.useContext(CurrentUser);
  const difficulty = DIFFICULTIES[gameState.difficultyLevel];
  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const currentQuestionCard = cards.find(
    (card) => card.id === currentQuestion.cardID
  )!;

  const onQuestionTimeout = React.useCallback(() => {
    dispatch({
      type: "answer",
      cardID: null,
      username: currentUserUsername,
    });
  }, [dispatch, currentUserUsername]);

  return (
    <QuestionLayout
      card={currentQuestionCard}
      visualEffects={difficulty.visualEffects}
    >
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
                username: currentUserUsername,
              });
            }}
            autoComplete="off"
          >
            <Heading as="label" {...getLabelProps()}>
              <FormattedMessage id="questionLabel" />
            </Heading>
            <Lifebar duration={30000} onTimeout={onQuestionTimeout} />
            <AutocompleteContainer
              {...getRootProps({ refKey: "ref" }, { suppressRefError: true })}
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
    </QuestionLayout>
  );
}
