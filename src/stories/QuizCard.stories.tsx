import { supabase, SupabaseContext } from "@api";
import QuizCard, { QuizCardProps } from "@components/Quiz/QuizCard";
import { Meta, Story } from "@storybook/react";
import { Columns } from "react-bulma-components";

export default {
  component: QuizCard,
  title: "QuizCard",
  decorators: [
    StoryComp => (
      <SupabaseContext.Provider value={supabase}>
        <StoryComp />
      </SupabaseContext.Provider>
    )
  ]
} as Meta;

export const Default: Story<QuizCardProps> = args => (
  <Columns>
    <Columns.Column size={3}>
      <QuizCard {...args} />
    </Columns.Column>
  </Columns>
);

Default.args = {
  author: "Random person",
  name: "Sample quiz",
  imagePath: "sample.png"
};
