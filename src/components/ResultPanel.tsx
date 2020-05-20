import * as React from "react";
import styled from "styled-components";
import Panel from "./Panel";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Caption from "./Caption";

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
  userAnswer: Card | null;
  onNext: () => void;
}

const TIME_BETWEEN_QUESTIONS = 30000;

export default function ResultPanel({ answer, userAnswer, onNext }: Props) {
  const [timeLeft, setTimeLeft] = React.useState(TIME_BETWEEN_QUESTIONS);

  React.useEffect(() => {
    const startedAt = new Date();
    let timeoutId: number | null = null;

    (function update() {
      const newTimeLeft =
        TIME_BETWEEN_QUESTIONS - (Date.now() - startedAt.getTime());
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
      {userAnswer == null ? (
        <>
          <Heading>Time out!</Heading>
          <ResultParagraph>
            This card is named <Correct>{answer.localizedName}</Correct>.
          </ResultParagraph>
        </>
      ) : userAnswer.id !== answer.id ? (
        <>
          <Heading>Nope.</Heading>
          <ResultParagraph>
            This card is not named{" "}
            <Incorrect>{userAnswer.localizedName}</Incorrect>, but{" "}
            <Correct>{answer.localizedName}</Correct>.
          </ResultParagraph>
        </>
      ) : (
        <>
          <Heading>Congrats!</Heading>
          <ResultParagraph>
            This card is named <Correct>{answer.localizedName}</Correct>.
          </ResultParagraph>
        </>
      )}
      <Caption>Next card in {Math.round(timeLeft / 1000)} seconds.</Caption>
    </Panel>
  );
}
