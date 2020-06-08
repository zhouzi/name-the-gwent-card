import * as React from "react";
import { useParams } from "react-router-dom";
import { useLocaleContext } from "app/i18n";
import { deserialize } from "app/GameState";
import { Game } from "../Game";

export function RoutePlayTwitch() {
  const { channel, gameRules } = useParams<{
    channel: string;
    gameRules: string;
  }>();
  const { cards } = useLocaleContext();

  return <Game channel={channel} gameRules={deserialize(gameRules, cards)} />;
}
