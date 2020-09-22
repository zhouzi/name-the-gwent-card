import * as React from "react";
import { useParams, Redirect } from "react-router-dom";
import { useLocaleContext } from "app/i18n";
import { deserialize } from "app/GameState";
import { Game } from "../Game";

export function RoutePlaySolo() {
  const { gameRules: serializedGameRules } = useParams<{ gameRules: string }>();
  const { cards } = useLocaleContext();
  const [gameRules] = React.useState(() =>
    deserialize(serializedGameRules, cards)
  );

  if (gameRules == null) {
    return <Redirect to="/" />;
  }

  return <Game gameRules={gameRules} />;
}
