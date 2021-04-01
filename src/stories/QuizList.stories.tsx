import { supabase, SupabaseContext } from "@api";
import QuizList, { QuizListProps } from "@components/Quiz/QuizList";
import { Meta, Story } from "@storybook/react";

export default {
  component: QuizList,
  title: "QuizList",
  decorators: [
    StoryComp => (
      <SupabaseContext.Provider value={supabase}>
        <StoryComp />
      </SupabaseContext.Provider>
    )
  ]
} as Meta;

export const Default: Story<QuizListProps> = args => <QuizList {...args} />;

Default.args = {
  quizzes: [
    {
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      id: 1,
      name: "Quiz of awesomness",
      image_url: "sample.png"
    },
    {
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      id: 2,
      name: "Quiz of awesomness 2",
      image_url: "sample.png"
    },
    {
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      id: 3,
      name: "Quiz of awesomness 3",
      image_url: "sample.png"
    },
    {
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      id: 4,
      name: "Quiz of awesomness 4",
      image_url: "sample.png"
    },
    {
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      id: 5,
      name: "Quiz of awesomness 5",
      image_url: "sample.png"
    },
    {
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      id: 6,
      name: "Quiz of awesomness 6",
      image_url: "sample.png"
    },
    {
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      id: 7,
      name: "Quiz of awesomness 7",
      image_url: "sample.png"
    },
    {
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      id: 8,
      name: "Quiz of awesomness 8",
      image_url: "sample.png"
    }
  ]
};
