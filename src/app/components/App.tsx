import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import { themeCSSVariables } from "design/theme";
import { GlobalStyle, FireSparks } from "design/components";
import {
  Provider as LocaleContextProvider,
  Consumer as LocaleContextConsumer,
} from "app/i18n";
import {
  ROUTES,
  RouteInstructionsSolo,
  RoutePlaySolo,
  RouteInstructionsTwitch,
  RoutePlayTwitch,
} from "./routes";

export function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={themeCSSVariables}>
        <LocaleContextProvider>
          <LocaleContextConsumer>
            {({ locale, messages }) => (
              <IntlProvider locale={locale} messages={messages}>
                <GlobalStyle />
                <FireSparks />
                <Switch>
                  <Route path={ROUTES.SOLO} exact={true}>
                    <RouteInstructionsSolo />
                  </Route>
                  <Route path={ROUTES.SOLO_PLAY} exact={true}>
                    <RoutePlaySolo />
                  </Route>
                  <Route path={ROUTES.TWITCH} exact={true}>
                    <RouteInstructionsTwitch />
                  </Route>
                  <Route path={ROUTES.TWITCH_PLAY} exact={true}>
                    <RoutePlayTwitch />
                  </Route>
                  <Redirect to={ROUTES.SOLO} />
                </Switch>
              </IntlProvider>
            )}
          </LocaleContextConsumer>
        </LocaleContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
