import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { IntlProvider } from "react-intl";
import messages from "../messages";
import enCards from "../cards.en.json";
import frCards from "../cards.fr.json";
import CardsContext, { CardsContainer } from "../containers/CardsContainer";
import LocaleContext from "../containers/LocaleContainer";
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
      <BrowserRouter>
        <LocaleContext.Provider
          value={{
            onChange: (newLocale: keyof typeof messages) =>
              setLocale(newLocale),
          }}
        >
          <CardsContext.Provider value={new CardsContainer(cards[locale])}>
            <Layout>
              <Switch>
                <Route path="/" exact>
                  <InstructionsSolo />
                </Route>
                <Route path="/viewers" exact>
                  <InstructionsViewers />
                </Route>
                <Route path="/play" exact>
                  <Game />
                </Route>
                <Route path="/play/:channel" exact>
                  <Game />
                </Route>
                <Route>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Layout>
          </CardsContext.Provider>
        </LocaleContext.Provider>
      </BrowserRouter>
    </IntlProvider>
  );
}
