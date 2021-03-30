import { ErrorMessage, FieldProps } from "formik";
import { FunctionComponent } from "react";
import { Form } from "react-bulma-components";

export interface TextInputProps {
  label?: string;
}

const TextInput: FunctionComponent<FieldProps & JSX.IntrinsicElements["input"] & TextInputProps> = (
  { label, field, ...props }
) => (
  <Form.Field>
    {label && <Form.Label htmlFor={field.name}>{label}</Form.Label>}

    <Form.Control>
      {/* Not using Form.Input to avoid typing issues ¯\_(ツ)_/¯ */}
      <input className="input" type="text" {...field} {...props} />
    </Form.Control>

    <ErrorMessage name={field.name} component="p" className="help is-danger" />
  </Form.Field>
);

export default TextInput;
