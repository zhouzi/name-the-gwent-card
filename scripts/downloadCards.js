const path = require("path");
const fs = require("fs");
const got = require("got");
const cheerio = require("cheerio");

async function getDeck(url) {
  const { body } = await got(url);
  const $ = cheerio.load(body);
  const { deck } = JSON.parse($("#root").attr("data-state"));

  return deck;
}

async function getDecks() {
  const { body } = await got("https://teamleviathangaming.com/meta/");
  const $ = cheerio.load(body);
  const decks = $("a[href^='https://www.playgwent.com/en/decks/']")
    .map((index, a) => $(a).attr("href"))
    .get();

  return Promise.all(decks.map((url) => getDeck(url)));
}

(async function downloadCards() {
  const decks = await getDecks();
  const cards = decks
    .reduce((acc, deck) => acc.concat(deck.cards), [])
    .filter(
      (card, index, cards) =>
        cards.findIndex((otherCard) => otherCard.id === card.id) === index
    );

  fs.writeFileSync(
    path.join(__dirname, "../src/cards.json"),
    JSON.stringify(cards, null, 2)
  );
})();
