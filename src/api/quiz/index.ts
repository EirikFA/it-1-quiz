/* eslint-disable import/prefer-default-export */
import { SupabaseClient } from "@supabase/supabase-js";
import { Definitions, Quiz } from "@types";

export const addQuiz = async (
  supabase: SupabaseClient,
  orig: Quiz,
  author: string
): Promise<void> => {
  const { data: quizData, error: quizError } = await supabase
    .from<Definitions["quizzes"]>("quizzes")
    .insert({
      author_id: author,
      name: orig.name
    });
  if (!quizData || quizError) {
    throw new Error(quizError?.message ?? "Failed to add quiz");
  }

  const questions: Partial<Definitions["questions"]>[] = orig.questions.map(({ prompt }) => ({
    quiz_id: quizData[0].id,
    prompt
  }));

  const { data: questionData, error: questionError } = await supabase
    .from<Definitions["questions"]>("questions")
    .insert(questions);
  if (!questionData || questionError) {
    throw new Error(questionError?.message ?? "Failed to add quiz");
  }

  // Better hope Supabase returns in the same order as we sent the questions 👀
  const options: Partial<Definitions["question_options"]>[] = questionData
    .map((q, index) => orig.questions[index].options.map(({ text, is_correct }) => ({
      question_id: q.id,
      text,
      is_correct: is_correct ?? false
    }))).flat();

  const { data: optionData, error: optionError } = await supabase
    .from<Definitions["question_options"]>("question_options")
    .insert(options);
  if (!optionData || optionError) {
    throw new Error(optionError?.message ?? "Failed to add quiz");
  }
};
