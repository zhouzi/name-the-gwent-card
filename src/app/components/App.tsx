import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { IntlProvider } from "react-intl";
import ROUTES from "app/ROUTES";
import messages from "app/messages";
import enCards from "app/cards.en.json";
import frCards from "app/cards.fr.json";
import {
  CardsCollectionContext,
  CardsCollectionContainer,
  LocaleContext,
} from "app/containers";

import Layout from "./Layout";
import InstructionsSolo from "./InstructionsSolo";
import Game from "./Game";
import InstructionsViewers from "./InstructionsViewers";

const SUPPORTED_LOCALES = Object.keys(messages) as Array<keyof typeof messages>;

const cards = {
  en: enCards,
  fr: frCards,
};

export default function App() {
  const [locale, setLocale] = React.useState<keyof typeof messages>(() => {
    const userLocale = window.navigator.languages
      .map((locale) =>
        SUPPORTED_LOCALES.find((supportedLocale) =>
          locale.toLowerCase().trim().startsWith(supportedLocale)
        )
      )
      .find((locale) => locale != null);
    const locale = userLocale || "en";

    return locale;
  });

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <LocaleContext.Provider
          value={{
            onChange: (newLocale: keyof typeof messages) =>
              setLocale(newLocale),
          }}
        >
          <CardsCollectionContext.Provider
            value={new CardsCollectionContainer(cards[locale])}
          >
            <Layout>
              <Switch>
                <Route path={ROUTES.HOMEPAGE} exact>
                  <InstructionsSolo />
                </Route>
                <Route path={ROUTES.VIEWERS} exact>
                  <InstructionsViewers />
                </Route>
                <Route path={ROUTES.PLAY} exact>
                  <Game />
                </Route>
                <Route path={ROUTES.PLAY_CHANNEL} exact>
                  <Game />
                </Route>
                <Route>
                  <Redirect to={ROUTES.HOMEPAGE} />
                </Route>
              </Switch>
            </Layout>
          </CardsCollectionContext.Provider>
        </LocaleContext.Provider>
      </BrowserRouter>
    </IntlProvider>
  );
}
