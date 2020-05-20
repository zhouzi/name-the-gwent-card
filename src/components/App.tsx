import * as React from "react";
import styled from "styled-components";
import Fuse from "fuse.js";
import randomItem from "random-item";
import cards from "../cards.json";
import useCountdown from "../useCountdown";
import Layout from "./Layout";
import Caption from "./Caption";
import List from "./List";
import ListItem from "./ListItem";
import Paragraph from "./Paragraph";
import Link from "./Link";
import QuestionPanel from "./QuestionPanel";
import ResultPanel from "./ResultPanel";

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

const Footer = styled(Caption).attrs({ as: "footer" })`
  padding: 1rem 2rem;
`;

const CardImage = styled.img`
  border-radius: 2px;
  transform: rotateY(-5deg);
  background-color: #000;
  box-shadow: 0 10px 40px #000;
`;

const BIG_PREVIEW_IMG_SIZE = {
  width: 376,
  height: 540,
};
const TIME_PER_QUESTION = 30000;
const fuse = new Fuse(cards, {
  keys: ["localizedName"],
});

function App() {
  const [card, setCard] = React.useState(randomItem(cards));
  const [userAnswer, setUserAnswer] = React.useState<{
    id: number;
    localizedName: string;
  } | null>(null);
  const { isStopped, timeLeft, stop, restart } = useCountdown(
    TIME_PER_QUESTION
  );

  return (
    <Layout>
      <Container>
        <ContainerLeftColumn>
          <CardImage
            src={`https://playgwent.com${card.previewImg.big}`}
            alt=""
            width={BIG_PREVIEW_IMG_SIZE.width}
            height={BIG_PREVIEW_IMG_SIZE.height}
          />
        </ContainerLeftColumn>
        <ContainerRightColumn>
          {isStopped ? (
            <ResultPanel
              answer={card}
              userAnswer={userAnswer}
              onNext={() => {
                setCard(randomItem(cards));
                setUserAnswer(null);
                restart();
              }}
            />
          ) : (
            <QuestionPanel
              onSubmit={(input: string) => {
                const results = fuse.search(input);
                if (results.length > 0) {
                  setUserAnswer(results[0].item);
                  stop();
                }
              }}
              remaining={timeLeft / TIME_PER_QUESTION}
            />
          )}
          <Footer>
            <List>
              <ListItem>
                <Link href="#">Play with your viewers</Link>
              </ListItem>
              <ListItem>
                Original idea from{" "}
                <Link href="https://www.twitch.tv/faberstein">Faberstein</Link>
              </ListItem>
              <ListItem>
                <Link href="https://github.com/zhouzi/name-the-gwent-card">
                  github.com/zhouzi/name-the-gwent-card
                </Link>
              </ListItem>
            </List>
            <Paragraph>
              This is an unofficial fan work under the{" "}
              <Link href="https://www.playgwent.com/en/fan-content">
                Gwent Fan Content Guidelines
              </Link>
              . Not approved/endorsed by CD PROJEKT RED.
            </Paragraph>
          </Footer>
        </ContainerRightColumn>
      </Container>
    </Layout>
  );
}

export default App;
