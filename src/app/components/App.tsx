import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { themeCSSVariables } from "design/theme";
import { GlobalStyle, FireSparks } from "design/components";
import { Provider as LocaleContextProvider } from "app/i18n";
import { ROUTES, RouteInstructions, RoutePlay } from "./routes";

export function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={themeCSSVariables}>
        <LocaleContextProvider>
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
        </LocaleContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
