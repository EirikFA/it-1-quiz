import { Question, QuestionOption, Quiz } from "@types";
import {
  array, boolean, object, SchemaOf, string
} from "yup";

export const questionOptionSchema: SchemaOf<QuestionOption> = object({
  text: string().required().label("Option text"),
  is_correct: boolean().default(false).label("Is correct")
});

export const questionSchema: SchemaOf<Question> = object({
  prompt: string().required().label("Question prompt"),
  options: array().required().min(2).of(questionOptionSchema)
    .label("Options")
});

export const quizSchema: SchemaOf<Quiz> = object({
  name: string().required().label("Quiz name"),
  questions: array().required().min(1).of(questionSchema)
});
