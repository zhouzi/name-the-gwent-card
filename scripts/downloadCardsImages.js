const path = require("path");
const fs = require("fs/promises");
const got = require("got");
const cards = require("../src/app/i18n/en/cards.json");

(async () => {
  for (const card of cards) {
    const { body: image } = await got(
      `https://playgwent.com${card.previewImg.big}`,
      { responseType: "buffer" }
    );
    await fs.writeFile(
      path.join(
        __dirname,
        "..",
        "public",
        "cards",
        `${card.id}${path.extname(card.previewImg.big)}`
      ),
      image
    );
  }
})();
