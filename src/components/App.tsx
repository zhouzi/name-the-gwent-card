import * as React from "react";
import styled from "styled-components";
import randomItem from "random-item";
import cards from "../cards.json";
import frame from "./assets/frame.png";
import useCountdown from "../useCountdown";
import Layout from "./Layout";

const Container = styled.section`
  max-width: 60rem;
  width: 100%;
  display: flex;
`;
const ContainerCard = styled.div`
  position: relative;
  z-index: 1;
`;
const ContainerQuestion = styled.div`
  position: relative;
  z-index: 0;
  margin-left: -1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const QuestionContainer = styled.div`
  position: relative;
  background: #000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  padding: 4rem 2rem;

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-width: 12px;
    border-style: solid;
    border-image-source: url(${frame});
    border-image-slice: 12;
    border-image-outset: 0;
    border-image-repeat: round;
    pointer-events: none;
  }
`;
const QuestionLabel = styled.label`
  font-family: Bitter, serif;
  line-height: 1.2;
  font-weight: 700;
  display: block;
  font-size: 2rem;
  margin-bottom: 2rem;
`;
const QuestionInput = styled.input`
  font: inherit;
  color: inherit;
  font-size: 1.2rem;
  background: transparent;
  border: 0;
  padding: 1rem 0;
  width: 100%;
  outline: none;

  ::placeholder {
    color: #989789;
  }
`;

const Footer = styled.footer`
  color: #989789;
  font-size: 0.9rem;
  padding: 1rem 2rem;
`;
const FooterLinks = styled.ul`
  margin: 0 0 1rem 0;
  padding: 0;
  list-style: none;
`;
const FooterLinksItem = styled.li``;
const FooterCopyright = styled.p`
  margin: 0;
`;

const Link = styled.a`
  color: #f3c053;
`;

const CardImage = styled.img`
  box-shadow: 0 10px 40px #000;
  border-radius: 2px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  transform: skew(-25deg);
  background-color: #21bf6f;
  border: 1px solid #19ad62;
  box-shadow: inset 0 2px 0 #35d685, 0 0 10px #21bf6f;
`;

const BIG_PREVIEW_IMG_SIZE = {
  width: 376,
  height: 540,
};
const TIME_PER_QUESTION = 30000;

function App() {
  const [card] = React.useState(randomItem(cards));
  const { timeLeft } = useCountdown(TIME_PER_QUESTION);

  return (
    <Layout>
      <Container>
        <ContainerCard>
          <CardImage
            src={`https://playgwent.com${card.previewImg.big}`}
            alt=""
            width={BIG_PREVIEW_IMG_SIZE.width}
            height={BIG_PREVIEW_IMG_SIZE.height}
          />
        </ContainerCard>
        <ContainerQuestion>
          <QuestionContainer>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <QuestionLabel htmlFor="answer">
                What's the name of this card?
              </QuestionLabel>
              <QuestionInput
                id="answer"
                type="text"
                placeholder="Submit your answer..."
                autoFocus
              />
              <ProgressBar
                style={{
                  width: `${(timeLeft / TIME_PER_QUESTION) * 100}%`,
                }}
              />
            </form>
          </QuestionContainer>
          <Footer>
            <FooterLinks>
              <FooterLinksItem>
                <Link href="#">Play with your viewers</Link>
              </FooterLinksItem>
              <FooterLinksItem>
                Original idea from <Link href="#">Faberstein</Link>
              </FooterLinksItem>
              <FooterLinksItem>
                <Link href="#">github.com/zhouzi/name-the-gwent-card</Link>
              </FooterLinksItem>
            </FooterLinks>
            <FooterCopyright>
              This is an unofficial fan work under the{" "}
              <Link href="https://www.playgwent.com/en/fan-content">
                Gwent Fan Content Guidelines
              </Link>
              . Not approved/endorsed by CD PROJEKT RED.
            </FooterCopyright>
          </Footer>
        </ContainerQuestion>
      </Container>
    </Layout>
  );
}

export default App;
