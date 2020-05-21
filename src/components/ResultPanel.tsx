import * as React from "react";
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
  userAnswer: Card | null;
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
      <Caption>
        Next card in {Math.round(timeLeft / 1000)} seconds (
        <Link as="button" type="button" onClick={() => onNext()}>
          skip
        </Link>
        ).
      </Caption>
    </Panel>
  );
}
