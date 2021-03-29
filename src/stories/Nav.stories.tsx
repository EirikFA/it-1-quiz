import Nav, { NavProps } from "@components/App/Nav";
import { Meta, Story } from "@storybook/react";

export default {
  component: Nav,
  title: "Nav"
} as Meta;

export const Default: Story<NavProps> = args => <Nav {...args} />;
