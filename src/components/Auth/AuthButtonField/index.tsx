import { AuthProvider } from "@types";
import { capitalise } from "@utils";
import { Fragment, FunctionComponent } from "react";
import { Button, Form } from "react-bulma-components";
import { ElementProps } from "react-bulma-components/src/components";
import { ButtonProps } from "react-bulma-components/src/components/button";

import styles from "./AuthButtonField.module.scss";

export type AuthButtonFieldProps = ButtonProps & ElementProps<ButtonProps, "button"> & { provider?: AuthProvider };

const AuthButtonField: FunctionComponent<AuthButtonFieldProps> = ({
  provider,
  children,
  ...props
}) => (
  <Form.Field>
    <Form.Control>
      <Button className={provider ? styles[provider] : undefined} {...props}>
        {children}
        {!children && provider && (
          <Fragment>
            <span className="icon">
              <i className={`fab fa-${provider.toLowerCase()}`} />
            </span>
            <span>Log in with {capitalise(provider)}</span>
          </Fragment>
        )}
      </Button>
    </Form.Control>
  </Form.Field>
);

export default AuthButtonField;
