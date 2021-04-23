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

const now = new Date();

Default.args = {
  quizzes: [
    {
      id: 1,
      name: "Quiz of awesomness",
      image_url: "sample.png",
      author_id: "not-a-uuid-:)",
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      questions: [],
      created_at: now
    },
    {
      id: 2,
      name: "Quiz of awesomness 2",
      image_url: "sample.png",
      author_id: "not-a-uuid-:)",
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      questions: [],
      created_at: now
    },
    {
      id: 3,
      name: "Quiz of awesomness 3",
      image_url: "sample.png",
      author_id: "not-a-uuid-:)",
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      questions: [],
      created_at: now
    },
    {
      id: 4,
      name: "Quiz of awesomness 4",
      image_url: "sample.png",
      author_id: "not-a-uuid-:)",
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      questions: [],
      created_at: now
    },
    {
      id: 5,
      name: "Quiz of awesomness 5",
      image_url: "sample.png",
      author_id: "not-a-uuid-:)",
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      questions: [],
      created_at: now
    },
    {
      id: 6,
      name: "Quiz of awesomness 6",
      image_url: "sample.png",
      author_id: "not-a-uuid-:)",
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      questions: [],
      created_at: now
    },
    {
      id: 7,
      name: "Quiz of awesomness 7",
      image_url: "sample.png",
      author_id: "not-a-uuid-:)",
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      questions: [],
      created_at: now
    },
    {
      id: 8,
      name: "Quiz of awesomness 8",
      image_url: "sample.png",
      author_id: "not-a-uuid-:)",
      author: {
        id: "not-a-uuid-:)",
        name: "Random person"
      },
      questions: [],
      created_at: now
    }
  ]
};
