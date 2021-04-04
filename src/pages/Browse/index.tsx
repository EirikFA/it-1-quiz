import QuizList, { QuizItem } from "@components/Quiz/QuizList";
import { useSupabase } from "@hooks";
import { RealtimeSubscription, SupabaseRealtimePayload } from "@supabase/supabase-js";
import { Definitions } from "@types";
import {
  FunctionComponent, useCallback, useEffect, useState
} from "react";
import { Container, Section } from "react-bulma-components";

const quizColumns = `
  id,
  name,
  image_url,
  author:author_id (
    id,
    name
  )
`;

const BrowsePage: FunctionComponent = () => {
  const supabase = useSupabase();

  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [error, setError] = useState("");

  const fetchQuizzes = useCallback(async (): Promise<void> => {
    const { data, error: quizzesError } = await supabase
      .from<QuizItem>("quizzes")
      .select(quizColumns);

    if (!data || quizzesError) {
      setError("Failed to fetch quizzes, please try reloading the page");
    } else {
      setQuizzes(data);
    }
  }, [supabase]);

  const handleInsert = useCallback(async (
    { new: { id } }: SupabaseRealtimePayload<Definitions["quizzes"]>
  ): Promise<void> => {
    // Ignoring errors for subscription because we don't really care about them :(
    const { data } = await supabase
      .from<QuizItem>("quizzes")
      .select(quizColumns)
      // @ts-ignore - weird Supabase typings for `match`
      // (values must be strings for some reason ¯\_(ツ)_/¯)
      .match({ id });

    if (data) {
      setQuizzes(old => {
        const newQuizzes = old.slice();
        newQuizzes.push(data[0]);
        return newQuizzes;
      });
    }
  }, [supabase]);

  const handleUpdate = async (
    { new: { id, ...changes } }: SupabaseRealtimePayload<Definitions["quizzes"]>
  ): Promise<void> => {
    console.log(changes, id);
    setQuizzes(old => {
      const newQuizzes = old.slice();
      const idx = old.findIndex(q => q.id === id);
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
    setQuizzes(old => {
      const newQuizzes = old.slice();
      const idx = old.findIndex(q => q.id === id);
      if (idx >= 0) newQuizzes.splice(idx, 1);
      return newQuizzes;
    });
  };

  useEffect(() => {
    fetchQuizzes();
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
  }, [fetchQuizzes, handleInsert, supabase]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Section>
      <Container>
        <QuizList quizzes={quizzes} />
      </Container>
    </Section>
  );
};

export default BrowsePage;
