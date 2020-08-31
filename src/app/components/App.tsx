import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "styled-components";
import { Helmet } from "react-helmet";
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
import { LEADERS } from "./Game/PhaseLoading";

export function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={themeCSSVariables}>
        <LocaleContextProvider>
          <LocaleContextConsumer>
            {({ locale, messages }) => (
              <IntlProvider locale={locale} messages={messages}>
                <Helmet
                  link={LEADERS.reduce<
                    Array<{ rel: "preload"; as: "image"; href: string }>
                  >(
                    (acc, leader) =>
                      acc.concat([
                        {
                          rel: "preload",
                          as: "image",
                          href: leader.avatar,
                        },
                        {
                          rel: "preload",
                          as: "image",
                          href: leader.border,
                        },
                      ]),
                    []
                  )}
                />
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
