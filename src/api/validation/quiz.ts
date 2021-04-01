import {
  array, boolean, mixed, object, string
} from "yup";

export const IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

export const questionOptionSchema = object({
  text: string().required().label("Option text"),
  is_correct: boolean().default(false).label("Is correct")
});

export const questionSchema = object({
  prompt: string().required().label("Question prompt"),
  options: array().required().min(2).of(questionOptionSchema)
    .label("Options")
});

export const quizSchema = object({
  name: string().required().label("Quiz name"),
  questions: array().required().min(1).of(questionSchema),
  image: mixed().required().test(
    "fileType",
    "Unsupported file type",
    value => value && IMAGE_TYPES.includes(value.type)
  ).label("Image")
});
