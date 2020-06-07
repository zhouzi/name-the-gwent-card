import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { themeCSSVariables } from "design/theme";
import { GlobalStyle, FireSparks } from "design/components";
import { ROUTES, RouteInstructions } from "./routes";

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeCSSVariables}>
        <GlobalStyle />
        <FireSparks />
        <Switch>
          <Route path={ROUTES.INSTRUCTIONS} exact={true}>
            <RouteInstructions />
          </Route>
          <Redirect to={ROUTES.INSTRUCTIONS} />
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}
