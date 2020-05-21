import * as React from "react";
import Fuse from "fuse.js";
import randomItem from "random-item";

const FUSE_OPTIONS = {
  keys: ["localizedName"],
  includeScore: true,
  minMatchCharLength: 3,
  shouldSort: true,
};

export class CardsContainer {
  private readonly cards: Card[];
  private readonly fuse: Fuse<Card, typeof FUSE_OPTIONS>;

  constructor(cards: Card[]) {
    this.cards = cards;
    this.fuse = new Fuse(cards, FUSE_OPTIONS);
  }

  search = (query: string): Card[] => {
    return this.fuse
      .search(query)
      .slice(0, 3)
      .map((match) => match.item);
  };

  find = (query: string): Card | null => {
    const matches = this.fuse.search(query);
    const firstMatch = matches[0];

    if (
      firstMatch == null ||
      firstMatch.score == null ||
      firstMatch.score > 0.3
    ) {
      return null;
    }

    return firstMatch.item;
  };

  random = (): Card => {
    return randomItem(this.cards);
  };
}

export default React.createContext(new CardsContainer([]));
