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

async function getDecks(locale) {
  const { body } = await got("https://teamleviathangaming.com/meta/");
  const $ = cheerio.load(body);
  const decks = $("a[href^='https://www.playgwent.com/en/decks/']")
    .map((index, a) => $(a).attr("href"))
    .get();

  return Promise.all(
    decks.map((url) => getDeck(url.replace(/\/en\//, `/${locale}/`)))
  );
}

function getCards(decks) {
  return decks
    .reduce((acc, deck) => acc.concat(deck.cards), [])
    .filter(
      (card, index, cards) =>
        cards.findIndex((otherCard) => otherCard.id === card.id) === index
    );
}

async function downloadsCards(locale) {
  const decks = await getDecks(locale);
  const cards = getCards(decks);

  fs.writeFileSync(
    path.join(__dirname, `../src/app/cards.${locale}.json`),
    JSON.stringify(cards, null, 2)
  );
}

(async () => {
  for (const locale of ["en", "fr"]) {
    await downloadsCards(locale);
  }
})();
