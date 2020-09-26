import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useLocaleContext } from "app/i18n";
import CurrentUser from "app/CurrentUser";
import { GameState, Action } from "app/GameState";
import { Heading, Paragraph, SecondsLeft, Link } from "design/components";
import { QuestionLayout } from "./QuestionLayout";

interface Props {
  gameState: GameState;
  dispatch: React.Dispatch<Action>;
}

export function PhaseBreak({ gameState, dispatch }: Props) {
  const { cards } = useLocaleContext();
  const { username: currentUserUsername } = React.useContext(CurrentUser);
  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const currentQuestionCard = cards.find(
    (card) => card.id === currentQuestion.cardID
  )!;
  const currentQuestionAnswer =
    gameState.answers[gameState.currentQuestionIndex];

  const onBreakTimeout = React.useCallback(() => {
    dispatch({
      type: "nextQuestion",
    });
  }, [dispatch]);

  return (
    <QuestionLayout card={currentQuestionCard} visualEffects={[]}>
      {currentQuestionAnswer.cardID === currentQuestion.cardID ? (
        <>
          <Heading>
            {currentQuestionAnswer.username !== currentUserUsername ? (
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
          {cards.find((card) => card.id === currentQuestionAnswer.cardID) ==
          null ? (
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
                  correctLocalizedName: currentQuestionCard.localizedName,
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
              <SecondsLeft duration={15000} onTimeout={onBreakTimeout} />
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
    </QuestionLayout>
  );
}
