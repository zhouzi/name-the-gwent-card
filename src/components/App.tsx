import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Game from "./Game";
import PlayWithViewers from "./PlayWithViewers";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/play" exact>
            <Game />
          </Route>
          <Route path="/play/viewers" exact>
            <PlayWithViewers />
          </Route>
          <Route path="/play/:gameid" exact>
            <Game />
          </Route>
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}
