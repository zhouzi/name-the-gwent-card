import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useLocaleContext } from "app/i18n";
import CurrentUser from "app/CurrentUser";
import { GameState, Action, DIFFICULTIES, InputMode } from "app/GameState";
import { Heading, Lifebar } from "design/components";
import { QuestionLayout } from "./QuestionLayout";
import { CardAutocomplete } from "./CardAutocomplete";
import { CardChoices } from "./CardChoices";

const INPUT_MODES = {
  [InputMode.Autocomplete]: CardAutocomplete,
  [InputMode.Choices]: CardChoices,
};

interface Props {
  gameState: GameState;
  dispatch: React.Dispatch<Action>;
}

export function PhaseInProgress({ gameState, dispatch }: Props) {
  const { cards } = useLocaleContext();
  const { username: currentUserUsername } = React.useContext(CurrentUser);
  const difficulty = DIFFICULTIES[gameState.difficultyLevel];
  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const currentQuestionCard = cards.find(
    (card) => card.id === currentQuestion.cardID
  )!;

  const onQuestionTimeout = React.useCallback(() => {
    dispatch({
      type: "timeOver",
    });
  }, [dispatch]);

  const Input = INPUT_MODES[difficulty.inputMode];

  return (
    <QuestionLayout
      card={currentQuestionCard}
      visualEffects={difficulty.visualEffects}
    >
      <Input
        card={currentQuestionCard}
        onSubmit={(selectedCard) =>
          dispatch({
            type: "answer",
            cardID: selectedCard.id,
            username: currentUserUsername,
          })
        }
      >
        <Heading as="label">
          <FormattedMessage id="questionLabel" />
        </Heading>
        <Lifebar duration={30000} onTimeout={onQuestionTimeout} />
      </Input>
    </QuestionLayout>
  );
}
