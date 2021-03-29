import "@fortawesome/fontawesome-free/css/all.css";
import "./UnauthenticatedApp.scss";

import { AuthPrompt } from "@components/Auth";
import { useSupabase } from "@hooks";
import { AuthProvider } from "@types";
import { FunctionComponent } from "react";
import { Container, Hero } from "react-bulma-components";

const UnauthenticatedApp: FunctionComponent = () => {
  const { auth } = useSupabase();

  const handleLogin = (provider: AuthProvider): void => {
    auth.signIn({
      provider: provider.toLowerCase() as Lowercase<AuthProvider>
    });
  };

  return (
    <Hero size="fullheight">
      <Hero.Body>
        <Container textAlignment="centered">
          <AuthPrompt onLogin={handleLogin} />
        </Container>
      </Hero.Body>
    </Hero>
  );
};

export default UnauthenticatedApp;
