import { AuthProvider } from "@types";
import { Fragment, FunctionComponent } from "react";

import { AuthButtonField } from "..";

export interface AuthPromptProps {
  onLogin: (provider: AuthProvider) => void;
}

const AuthPrompt: FunctionComponent<AuthPromptProps> = ({ onLogin }) => (
  <Fragment>
    <AuthButtonField provider="google" onClick={() => onLogin("google")} />
    <AuthButtonField provider="gitHub" onClick={() => onLogin("gitHub")} />
    <AuthButtonField provider="facebook" onClick={() => onLogin("facebook")} />
  </Fragment>
);

export default AuthPrompt;
