import * as React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import randomItem from "random-item";
import { Client } from "tmi.js";
import cards from "../cards.json";
import GAME_RULES from "../GAME_RULES";
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
    };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.SubmitAnswer:
      if (state.endsAt == null) {
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
        answer: randomItem(cards),
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
  const [{ zoom, answer, userAnswer, endsAt }, dispatch] = React.useReducer(
    reducer,
    {
      zoom: 1,
      answer: randomItem(cards),
      userAnswer: { username: null, answer: null },
      endsAt: new Date(Date.now() + GAME_RULES.TIME_PER_CARD),
    }
  );
  const { channel } = useParams<{ channel?: string }>();

  React.useEffect(() => {
    if (channel == null) {
      return;
    }

    const client = Client({
      connection: {
        secure: true,
        reconnect: true,
      },
      channels: [channel],
    });

    client.connect();

    client.on("message", (channel, tags, message, self) => {
      // TODO: ignore message if it couldn't be matched to a card
      // TODO: ignore message if it's incorrect
      dispatch({
        type: ActionType.SubmitAnswer,
        userAnswer: {
          username: tags["display-name"] || null,
          answer: null,
        },
      });
    });

    return () => {
      client.disconnect();
    };
  }, [channel, dispatch]);

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
