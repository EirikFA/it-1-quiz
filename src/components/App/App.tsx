import { useSession } from "@hooks";
import { FunctionComponent } from "react";

import { AuthenticatedApp, UnauthenticatedApp } from ".";

const App: FunctionComponent = () => {
  const session = useSession();

  return session?.user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
