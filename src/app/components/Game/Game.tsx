import * as React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CardImage } from "design";
import createClient from "app/createClient";
import { CardsCollectionContext } from "app/containers";
import GAME_RULES from "app/GAME_RULES";
import Footer from "app/components/Footer";

import QuestionPanel from "./QuestionPanel";
import ResultPanel from "./ResultPanel";

const Container = styled.section`
  max-width: 60rem;
  width: 100%;

  @media (min-width: 800px) {
    display: flex;
    perspective: 1500px;
  }
`;
const ContainerLeftColumn = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  @media (min-width: 800px) {
    z-index: 1;
  }
`;
const ContainerRightColumn = styled.div`
  position: relative;
  z-index: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 800px) {
    margin-left: -1rem;
  }
`;

const FooterContainer = styled.div`
  @media (min-width: 800px) {
    padding: 0 2rem;
  }
`;

interface State {
  zoom: number;
  answer: Card;
  userAnswer: {
    username: string | null;
    answer: Card | null;
  };
  endsAt: Date | null;
}

enum ActionType {
  SubmitAnswer = "SubmitAnswer",
  TimeOut = "TimeOut",
  NextCard = "NextCard",
}

type Action =
  | {
      type: ActionType.SubmitAnswer;
      userAnswer: {
        username: string | null;
        answer: Card | null;
      };
    }
  | {
      type: ActionType.TimeOut;
    }
  | {
      type: ActionType.NextCard;
      answer: Card;
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.SubmitAnswer:
      if (state.endsAt == null) {
        // Ignore answers that are sent too late.
        return state;
      }

      if (
        action.userAnswer.username &&
        action.userAnswer.answer?.id !== state.answer.id
      ) {
        // Ignore wrong answers from the Twitch chat.
        return state;
      }

      return {
        ...state,
        userAnswer: action.userAnswer,
        endsAt: null,
      };
    case ActionType.TimeOut:
      return {
        ...state,
        endsAt: null,
      };
    case ActionType.NextCard:
      return {
        zoom: Math.min(
          GAME_RULES.MAX_ZOOM,
          Math.max(
            GAME_RULES.MIN_ZOOM,
            state.userAnswer.answer?.id === state.answer.id
              ? state.zoom + GAME_RULES.ZOOM_ON_WIN
              : state.zoom + GAME_RULES.ZOOM_ON_LOSE
          )
        ),
        answer: action.answer,
        userAnswer: {
          username: null,
          answer: null,
        },
        endsAt: new Date(Date.now() + GAME_RULES.TIME_PER_CARD),
      };
    default:
      return state;
  }
}

export default function Game() {
  const cards = React.useContext(CardsCollectionContext);
  const [{ zoom, answer, userAnswer, endsAt }, dispatch] = React.useReducer(
    reducer,
    {
      zoom: 1,
      answer: cards.random(),
      userAnswer: {
        username: null,
        answer: null,
      },
      endsAt: new Date(Date.now() + GAME_RULES.TIME_PER_CARD),
    }
  );
  const { channel } = useParams<{ channel?: string }>();

  React.useEffect(() => {
    if (channel == null) {
      return;
    }

    const client = createClient();

    client.connect().then(() => client.join(channel));

    client.on("message", (channel, tags, message, self) => {
      const match = cards.find(message);

      if (match == null) {
        return;
      }

      dispatch({
        type: ActionType.SubmitAnswer,
        userAnswer: {
          username: tags["display-name"] || null,
          answer: match,
        },
      });
    });

    return () => {
      client.disconnect();
    };
  }, [channel, cards, dispatch]);

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

      dispatch({
        type: ActionType.TimeOut,
      });
    })();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [endsAt, dispatch]);

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
              dispatch({
                type: ActionType.NextCard,
                answer: cards.random(),
              });
            }}
          />
        ) : (
          <QuestionPanel
            onSubmit={(userAnswer: {
              username: string | null;
              answer: Card | null;
            }) => {
              dispatch({
                type: ActionType.SubmitAnswer,
                userAnswer,
              });
            }}
            startedAt={new Date(endsAt.getTime() - GAME_RULES.TIME_PER_CARD)}
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
