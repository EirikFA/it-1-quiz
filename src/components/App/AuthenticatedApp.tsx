import { useSupabase } from "@hooks";
import { BrowsePage, MePage, PlayPage } from "@pages";
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
        <Route path="/play/:id" component={PlayPage} />
      </Switch>
    </Fragment>
  );
};

export default App;
