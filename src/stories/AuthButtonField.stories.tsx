import { AuthButtonField } from "@components/Auth";
import { AuthButtonFieldProps } from "@components/Auth/AuthButtonField";
import { Meta, Story } from "@storybook/react";

export default {
  component: AuthButtonField,
  title: "AuthButtonField",
  argTypes: {
    provider: {
      control: {
        type: "select",
        options: ["google", "gitHub", "facebook"]
      }
    }
  }
} as Meta<AuthButtonFieldProps>;

const Template: Story<AuthButtonFieldProps> = args => <AuthButtonField {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: "Log in with provider",
  color: "light"
};

export const WithProvider = Template.bind({});
WithProvider.storyName = "With provider";
WithProvider.args = {
  provider: "google"
};
