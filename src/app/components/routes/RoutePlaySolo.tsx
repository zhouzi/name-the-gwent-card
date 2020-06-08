import * as React from "react";
import { useParams } from "react-router-dom";
import { useLocaleContext } from "app/i18n";
import { deserialize } from "app/GameState";
import { Game } from "../Game";

export function RoutePlaySolo() {
  const { gameRules } = useParams<{ gameRules: string }>();
  const { cards } = useLocaleContext();

  return <Game gameRules={deserialize(gameRules, cards)} />;
}
