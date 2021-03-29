import "./AuthenticatedApp.scss";

import { useSupabase } from "@hooks";
import { BrowsePage, MePage } from "@pages";
import { Fragment, FunctionComponent } from "react";
import { Route, Switch } from "wouter";

import Nav from "./Nav";

const App: FunctionComponent = () => {
  const { auth } = useSupabase();

  return (
    <Fragment>
      <Nav onLogout={() => auth.signOut()} />
      <Switch>
        <Route path="/" component={BrowsePage} />
        <Route path="/me" component={MePage} />
      </Switch>
    </Fragment>
  );
};

export default App;
