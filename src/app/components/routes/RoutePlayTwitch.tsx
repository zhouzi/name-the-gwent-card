import * as React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useLocaleContext } from "app/i18n";
import { deserialize } from "app/GameState";
import { Game } from "../Game";

export function RoutePlayTwitch() {
  const { channel, gameRules: serializedGameRules } = useParams<{
    channel: string;
    gameRules: string;
  }>();
  const { cards } = useLocaleContext();
  const [gameRules] = React.useState(() =>
    deserialize(serializedGameRules, cards)
  );

  if (gameRules == null) {
    return <Redirect to="/" />;
  }

  return <Game channel={channel} gameRules={gameRules} />;
}
