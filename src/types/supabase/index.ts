import { Definitions } from "./openAPI";

export * from "./openAPI";

export type QuestionOption = Omit<Definitions["question_options"], "id" | "question_id">;

export type Question = Omit<Definitions["questions"], "id" | "quiz_id"> & {
  options: QuestionOption[];
};

export type Quiz = Omit<Definitions["quizzes"], "id" | "author_id"> & {
  questions: Question[];
};
