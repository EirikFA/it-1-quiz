import { useSupabase } from "@hooks";
import { RealtimeSubscription, SupabaseRealtimePayload } from "@supabase/supabase-js";
import { Definitions, Quiz } from "@types";
import { useCallback, useEffect, useState } from "react";

export const quizColumns = `
  id,
  name,
  image_url,
  author_id,
  author:author_id (
    id,
    name
  )
`;

export const questionColumns = `
  id,
  prompt,
  quiz_id
`;

export const questionOptionColumns = `
  id,
  text,
  is_correct,
  question_id
`;

interface Result {
  loading: boolean;
  error: boolean;
  data: Quiz[] | null;
}

// Inline the default for `filter` and watch the network log 👀
// The hook will re-run after fetching data because the component that called it has a state
// update (duh). If the default object literal is inlined, it will create a new reference every time
// the hook runs, aaand we have an infinite loop of network requests and re-renders.
const defaultFilter = {};

const useQuizzes = (
  filter: { [K in keyof Quiz]?: string } = defaultFilter,
  depth?: "questions" | "question_options"
): Result => {
  let select = quizColumns;

  if (depth === "questions") {
    select += `
      ,
      questions (
        ${questionColumns}
      )
    `;
  }

  if (depth === "question_options") {
    select += `
      ,
      questions (
        ${questionColumns},
        options:question_options (
          ${questionOptionColumns}
        )
      )
    `;
  }

  const supabase = useSupabase();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);

  const fetchData = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from<Quiz>("quizzes")
      .select(select)
      .match(filter);

    if (!data || fetchError) setError(true);
    else setQuizzes(data);

    setLoading(false);
  }, [supabase, filter, select]);

  const handleInsert = useCallback(async (
    { new: { id } }: SupabaseRealtimePayload<Definitions["quizzes"]>
  ): Promise<void> => {
    // Ignoring errors for subscription because we don't really care about them :(
    const { data } = await supabase
      .from<Quiz>("quizzes")
      .select(quizColumns)
      // @ts-ignore - weird Supabase typings for `match`
      // (values must be strings for some reason ¯\_(ツ)_/¯)
      .match({ id });

    if (data) {
      setQuizzes(prev => {
        const newQuizzes = prev ? prev.slice() : [];
        newQuizzes.push(data[0]);
        return newQuizzes;
      });
    }
  }, [supabase]);

  const handleUpdate = async (
    { new: { id, ...changes } }: SupabaseRealtimePayload<Definitions["quizzes"]>
  ): Promise<void> => {
    setQuizzes(prev => {
      if (!prev) return prev;

      const newQuizzes = prev.slice();
      const idx = prev.findIndex(q => q.id === id);
      if (idx >= 0) {
        newQuizzes[idx] = {
          ...newQuizzes[idx],
          ...changes
        };
      }
      return newQuizzes;
    });
  };

  const handleDelete = async (
    { old: { id } }: SupabaseRealtimePayload<Definitions["quizzes"]>
  ): Promise<void> => {
    setQuizzes(prev => {
      if (!prev) return prev;

      const newQuizzes = prev.slice();
      const idx = prev.findIndex(q => q.id === id);
      if (idx >= 0) newQuizzes.splice(idx, 1);
      return newQuizzes;
    });
  };

  useEffect(() => {
    fetchData();

    const subscriptions: RealtimeSubscription[] = [];

    subscriptions.push(
      supabase
        .from<Definitions["quizzes"]>("quizzes")
        .on("INSERT", handleInsert)
        .subscribe()
    );

    subscriptions.push(
      supabase
        .from<Definitions["quizzes"]>("quizzes")
        .on("UPDATE", handleUpdate)
        .subscribe()
    );

    subscriptions.push(
      supabase
        .from<Definitions["quizzes"]>("quizzes")
        .on("DELETE", handleDelete)
        .subscribe()
    );

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [supabase, fetchData, handleInsert]);

  return {
    loading,
    error,
    data: quizzes
  };
};

export default useQuizzes;
