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
import { ROUTES, RouteInstructions, RoutePlay } from "./routes";

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
                  <Route path={ROUTES.INSTRUCTIONS} exact={true}>
                    <RouteInstructions />
                  </Route>
                  <Route path={ROUTES.PLAY} exact={true}>
                    <RoutePlay />
                  </Route>
                  <Redirect to={ROUTES.INSTRUCTIONS} />
                </Switch>
              </IntlProvider>
            )}
          </LocaleContextConsumer>
        </LocaleContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
