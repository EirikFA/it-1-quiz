import { AuthPrompt } from "@components/Auth";
import { AuthPromptProps } from "@components/Auth/AuthPrompt";
import { Meta, Story } from "@storybook/react";

export default {
  component: AuthPrompt,
  title: "AuthPrompt"
} as Meta;

export const Default: Story<AuthPromptProps> = args => <AuthPrompt {...args} />;
