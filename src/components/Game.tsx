import * as React from "react";
import styled from "styled-components";
import Fuse from "fuse.js";
import randomItem from "random-item";
import cards from "../cards.json";
import QuestionPanel from "./QuestionPanel";
import ResultPanel from "./ResultPanel";
import CardImage from "./CardImage";
import Footer from "./Footer";

const Container = styled.section`
  max-width: 60rem;
  width: 100%;
  display: flex;
  perspective: 1500px;
`;
const ContainerLeftColumn = styled.div`
  position: relative;
  z-index: 1;
`;
const ContainerRightColumn = styled.div`
  position: relative;
  z-index: 0;
  margin-left: -1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const FooterContainer = styled.div`
  padding: 0 2rem;
`;

const TIME_PER_QUESTION = 30000;
const fuse = new Fuse(cards, {
  keys: ["localizedName"],
  includeScore: true,
  minMatchCharLength: 3,
  shouldSort: true,
});

interface State {
  zoom: number;
  answer: Card;
  userAnswer: Card | null;
  endsAt: Date | null;
}

export default function Game() {
  const [{ zoom, answer, userAnswer, endsAt }, setState] = React.useState<
    State
  >({
    zoom: 1,
    answer: randomItem(cards),
    userAnswer: null,
    endsAt: new Date(Date.now() + TIME_PER_QUESTION),
  });

  React.useEffect(() => {
    let timeoutId: number | null = null;

    (function update() {
      if (endsAt == null) {
        return;
      }

      if (endsAt.getTime() > Date.now()) {
        timeoutId = window.setTimeout(update, 1000);
        return;
      }

      setState((currentState) => ({
        ...currentState,
        endsAt: null,
      }));
    })();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [endsAt, setState]);

  return (
    <Container>
      <ContainerLeftColumn>
        <CardImage card={answer} zoom={endsAt == null ? 1 : zoom} />
      </ContainerLeftColumn>
      <ContainerRightColumn>
        {endsAt == null ? (
          <ResultPanel
            answer={answer}
            userAnswer={userAnswer}
            onNext={() => {
              setState({
                zoom: Math.min(
                  5,
                  Math.max(
                    1,
                    userAnswer?.id === answer.id ? zoom + 0.5 : zoom - 0.5
                  )
                ),
                answer: randomItem(cards),
                userAnswer: null,
                endsAt: new Date(Date.now() + TIME_PER_QUESTION),
              });
            }}
          />
        ) : (
          <QuestionPanel
            onSubmit={(input: string) => {
              const matches = fuse.search(input);
              const bestMatch = matches[0];

              if (
                bestMatch &&
                bestMatch.score != null &&
                bestMatch.score <= 0.3
              ) {
                setState((currentState) => ({
                  ...currentState,
                  userAnswer: bestMatch.item,
                  endsAt: null,
                }));
              }
            }}
            startedAt={new Date(endsAt.getTime() - TIME_PER_QUESTION)}
            endsAt={endsAt}
          />
        )}
        <FooterContainer>
          <Footer />
        </FooterContainer>
      </ContainerRightColumn>
    </Container>
  );
}
