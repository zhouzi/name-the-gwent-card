import * as React from "react";
import styled from "styled-components";
import randomItem from "random-item";
import createDebug from "debug";
import { Container, Heading, Paragraph } from "design/components";
import { GameState, Action } from "app/GameState";
import morvan from "design/assets/morvan.png";
import emhyr from "design/assets/emhyr.png";
import nilfgaardBorder from "design/assets/nilfgaardBorder.png";
import dettlaff from "design/assets/dettlaff.png";
import woodland from "design/assets/woodland.png";
import eredin from "design/assets/eredin.png";
import monsterBorder from "design/assets/monsterBorder.png";
import meve from "design/assets/meve.png";
import foltest from "design/assets/foltest.png";
import northerRealmBorder from "design/assets/northerRealmBorder.png";
import brouver from "design/assets/brouver.png";
import scoiataelBorder from "design/assets/scoiataelBorder.png";
import bronze from "design/assets/bronze.png";

const debug = createDebug("PhaseLoading");

export const LEADERS = [
  {
    name: "Morvran Voorhis",
    avatar: morvan,
    border: nilfgaardBorder,
    taunts: ["morvranTaunt1", "morvranTaunt2", "morvranTaunt3"],
  },
  {
    name: "Emhyr var Emreis",
    avatar: emhyr,
    border: nilfgaardBorder,
    taunts: ["emhyrTaunt1", "emhyrTaunt2"],
  },
  {
    name: "Dettlaff van der Eretein",
    avatar: dettlaff,
    border: monsterBorder,
    taunts: ["dettlaffTaunt1", "dettlaffTaunt2", "dettlaffTaunt3"],
  },
  {
    name: "Woodland Spirit",
    avatar: woodland,
    border: monsterBorder,
    taunts: ["woodlandTaunt1"],
  },
  {
    name: "Eredin Bréacc Glas",
    avatar: eredin,
    border: monsterBorder,
    taunts: ["eredinTaunt1", "eredinTaunt2", "eredinTaunt3"],
  },
  {
    name: "Queen Meve",
    avatar: meve,
    border: northerRealmBorder,
    taunts: ["meveTaunt1", "meveTaunt2", "meveTaunt3"],
  },
  {
    name: "King Foltest",
    avatar: foltest,
    border: northerRealmBorder,
    taunts: ["foltestTaunt1", "foltestTaunt2", "foltestTaunt3"],
  },
  {
    name: "Brouver Hoog",
    avatar: brouver,
    border: scoiataelBorder,
    taunts: ["brouverTaunt1", "brouverTaunt2", "brouverTaunt3"],
  },
];

interface Props {
  gameState: GameState;
  dispatch: React.Dispatch<Action>;
}

const LeaderAvatar = styled.div<{ border: string; avatar: string }>`
  width: 200px;
  height: 200px;
  background-image: url(${(props) => props.border}),
    url(${(props) => props.avatar});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%, 38%;
`;

const Flavour = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.large};

  & > *:last-child {
    flex: 1;
  }
`;

const Quote = styled.blockquote`
  padding: 0 ${(props) => props.theme.spacing.normal};
  margin: 0;
`;

function preloadImages(images: string[], signal: AbortSignal) {
  return new Promise((resolve, reject) => {
    if (images.length === 0) {
      debug("All images have been loaded, resolving");

      resolve();
      return;
    }

    const head = images[0];
    const tail = images.slice(1);

    const image = window.document.createElement("img");

    const onAbort = () => {
      debug(`Loading ${head} has been aborted, rejecting now`);

      image.removeEventListener("load", onLoad);
      reject();
    };
    const onLoad = () => {
      debug(`Loaded ${head}`);

      signal.removeEventListener("abort", onAbort);
      resolve(preloadImages(tail, signal));
    };

    signal.addEventListener("abort", onAbort);
    image.addEventListener("load", onLoad);

    debug(`Loading ${head}`);
    image.src = head;
  });
}

export function PhaseLoading({ gameState, dispatch }: Props) {
  const [leader] = React.useState(() => {
    const { name, avatar, border, taunts } = randomItem(LEADERS);

    return {
      name,
      avatar,
      border,
      taunt: randomItem(taunts),
    };
  });

  React.useEffect(() => {
    const controller = new AbortController();

    preloadImages(
      [bronze].concat(
        gameState.questions.map(
          (question) => `https://playgwent.com${question.card.previewImg.big}`
        )
      ),
      controller.signal
    ).then(() => {
      dispatch({
        type: "loaded",
      });
    });

    return () => {
      controller.abort();
    };
  }, [gameState.questions, dispatch]);

  return (
    <Container variant="large">
      <Flavour>
        <LeaderAvatar avatar={leader.avatar} border={leader.border} />
        <Quote>
          <Heading>{leader.taunt}</Heading>
          <Paragraph as="footer" variant="hint">
            - {leader.name}
          </Paragraph>
        </Quote>
      </Flavour>
    </Container>
  );
}
