import { Definitions } from "./openAPI";

export * from "./openAPI";

export type QuestionOption = Definitions["question_options"];

export type Question = Definitions["questions"] & {
  options: QuestionOption[];
};

export type Quiz = Definitions["quizzes"] & {
  questions: Question[];
  author: Definitions["users"];
};

export type QuestionOptionInput = Omit<QuestionOption, "id" | "question_id">;

export type QuestionInput = Omit<Question, "id" | "quiz_id" | "options"> & {
  options: QuestionOptionInput[];
};

export type QuizInput = Omit<Quiz, "id" | "author_id" | "author" | "questions"> & {
  questions: QuestionInput[];
};
