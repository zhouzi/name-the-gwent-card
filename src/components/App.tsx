import * as React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Layout from "./Layout";
import InstructionsSolo from "./InstructionsSolo";
import Game from "./Game";
import InstructionsViewers from "./InstructionsViewers";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <InstructionsSolo />
          </Route>
          <Route path="/play" exact>
            <Game />
          </Route>
          <Route path="/play/viewers" exact>
            <InstructionsViewers />
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
