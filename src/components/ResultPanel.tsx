import * as React from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import GAME_RULES from "../GAME_RULES";
import Panel from "./Panel";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Caption from "./Caption";
import Link from "./Link";

const ResultParagraph = styled(Paragraph)`
  font-size: 1.2rem;
`;
const Correct = styled.span`
  color: #21bf6f;
  font-weight: 700;
`;
const Incorrect = styled.span`
  color: #d22a2a;
  font-weight: 700;
`;

interface Props {
  answer: Card;
  userAnswer: {
    username: string | null;
    answer: Card | null;
  };
  onNext: () => void;
}

export default function ResultPanel({ answer, userAnswer, onNext }: Props) {
  const [timeLeft, setTimeLeft] = React.useState(GAME_RULES.TIME_BETWEEN_CARDS);

  React.useEffect(() => {
    const startedAt = new Date();
    let timeoutId: number | null = null;

    (function update() {
      const newTimeLeft =
        GAME_RULES.TIME_BETWEEN_CARDS - (Date.now() - startedAt.getTime());
      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        onNext();
        timeoutId = null;
        return;
      }

      timeoutId = window.setTimeout(update, 1000);
    })();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  }, [onNext]);

  return (
    <Panel>
      {userAnswer.answer == null ? (
        <>
          <Heading>
            <FormattedMessage id="timeout" defaultMessage="Time out!" />
          </Heading>
          <ResultParagraph>
            <FormattedMessage
              id="cardName"
              defaultMessage="This card is named {name}."
              values={{
                name: <Correct>{answer.localizedName}</Correct>,
              }}
            />
          </ResultParagraph>
        </>
      ) : userAnswer.answer.id !== answer.id ? (
        <>
          <Heading>
            <FormattedMessage id="fail" defaultMessage="Nope." />
          </Heading>
          <ResultParagraph>
            <FormattedMessage
              id="cardNameNotBut"
              defaultMessage="This card is not named {invalid}, but {valid}."
              values={{
                invalid: (
                  <Incorrect>{userAnswer.answer.localizedName}</Incorrect>
                ),
                valid: <Correct>{answer.localizedName}</Correct>,
              }}
            />
          </ResultParagraph>
        </>
      ) : (
        <>
          <Heading>
            {userAnswer.username ? (
              <FormattedMessage
                id="congratsUser"
                defaultMessage="Congrats {username}!"
                values={{ username: userAnswer.username }}
              />
            ) : (
              <FormattedMessage
                id="congrats"
                defaultMessage="Congrats!"
                values={{ username: userAnswer.username }}
              />
            )}
          </Heading>
          <ResultParagraph>
            <FormattedMessage
              id="cardName"
              defaultMessage="This card is named {name}."
              values={{
                name: <Correct>{answer.localizedName}</Correct>,
              }}
            />
          </ResultParagraph>
        </>
      )}
      <Caption>
        <FormattedMessage
          id="nextCardIn"
          defaultMessage="Next card in {seconds} seconds (<a>skip<a>)."
          values={{
            seconds: Math.round(timeLeft / 1000),
            a: (children: string) => (
              <Link
                as="button"
                type="button"
                onClick={() => onNext()}
                autoFocus
              >
                {children}
              </Link>
            ),
          }}
        />
      </Caption>
    </Panel>
  );
}
