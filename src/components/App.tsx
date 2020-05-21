import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { IntlProvider } from "react-intl";
import messages from "../messages";
import cards from "../cards.json";
import CardsContext, { CardsContainer } from "../containers/CardsContainer";
import Layout from "./Layout";
import InstructionsSolo from "./InstructionsSolo";
import Game from "./Game";
import InstructionsViewers from "./InstructionsViewers";

const SUPPORTED_LOCALES = Object.keys(messages) as Array<keyof typeof messages>;

export default function App() {
  const userLocale = window.navigator.languages
    .map((locale) =>
      SUPPORTED_LOCALES.find((supportedLocale) =>
        locale.toLowerCase().trim().startsWith(supportedLocale)
      )
    )
    .find((locale) => locale != null);
  const locale = userLocale || "en";

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BrowserRouter>
        <CardsContext.Provider value={new CardsContainer(cards)}>
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
      </BrowserRouter>
    </IntlProvider>
  );
}
