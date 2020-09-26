import * as React from "react";
import styled from "styled-components";
import { VisualEffect } from "app/GameState";
import { Container, Panel } from "design/components";
import { CardWithVisualEffects } from "./CardWithVisualEffects";
import { Footer } from "../Footer";

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${(props) => props.theme.breakpoints.up("small")} {
    flex-direction: row;
    perspective: 1500px;
  }
`;

const QuestionPanelContainer = styled.div`
  position: relative;
  z-index: 1;
  margin-top: calc(-1 * ${(props) => props.theme.spacing.large});

  @media ${(props) => props.theme.breakpoints.up("small")} {
    z-index: 0;
    margin-top: 0;
    margin-left: calc(-1 * ${(props) => props.theme.spacing.large});
  }
`;

const QuestionPanel = styled(Panel)`
  padding-left: calc(
    ${(props) => props.theme.spacing.large} +
      ${(props) => props.theme.spacing.normal}
  );
`;

const QuestionFooter = styled(Footer)`
  @media ${(props) => props.theme.breakpoints.up("small")} {
    padding-left: calc(
      ${(props) => props.theme.spacing.large} +
        ${(props) => props.theme.spacing.normal}
    );
  }
`;

interface Props {
  card: GwentCard;
  visualEffects: VisualEffect[];
  children: React.ReactNode;
}

export function QuestionLayout({ card, visualEffects, children }: Props) {
  return (
    <Container variant="large">
      <QuestionContainer>
        <CardWithVisualEffects card={card} visualEffects={visualEffects} />
        <QuestionPanelContainer>
          <QuestionPanel>{children}</QuestionPanel>
          <QuestionFooter as={Footer} />
        </QuestionPanelContainer>
      </QuestionContainer>
    </Container>
  );
}
