import QuizQuestion from "@components/Quiz/QuizQuestion";
import {
  useFileURL, useQuizzes, useSession, useSupabase
} from "@hooks";
import { Definitions, QuestionOption } from "@types";
import { shuffle } from "@utils";
import {
  FormEvent,
  FunctionComponent, useMemo, useState
} from "react";
import {
  Button, Container, Heading, Image, Section
} from "react-bulma-components";
import { RouteComponentProps } from "wouter";

import styles from "./Play.module.scss";

type PlayPageParams = {
  id: string;
};

const PlayPage: FunctionComponent<RouteComponentProps<PlayPageParams>> = ({ params: { id } }) => {
  const supabase = useSupabase();
  const session = useSession();

  const filter = useMemo(() => ({ id }), [id]);
  const { loading, data, error } = useQuizzes(filter, "question_options");
  const [quiz] = data ?? [undefined];
  const questions = useMemo(() => {
    if (quiz) {
      const newQuestions = quiz.questions.slice();
      quiz.questions.forEach((_, index) => {
        newQuestions[index].options = shuffle(newQuestions[index].options);
      });

      for (let i = 0; i < newQuestions.length; i++) {
        newQuestions[i].options = shuffle(newQuestions[i].options);
      }

      return shuffle(newQuestions);
    }

    return undefined;
  }, [quiz]);

  const { loading: loadingImage, url: imageUrl } = useFileURL(
    "quizzes",
    quiz?.image_url
  );

  const [status, setStatus] = useState({
    loading: false,
    markOptions: false
  });

  const [selected, setSelected] = useState<Map<number, QuestionOption>>(new Map());
  const toggleOption = (option: QuestionOption) => {
    if (status.markOptions) return;

    setSelected(prev => {
      const newMap = new Map(prev);
      newMap.set(option.question_id, option);
      return newMap;
    });
  };

  const [quizError, setQuizError] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selected.size !== questions?.length) setQuizError("Please answer all questions");
    else if (quiz && session) {
      setQuizError("");

      setStatus(prev => ({
        ...prev,
        loading: true
      }));

      await supabase
        .from<Definitions["played_quizzes"]>("played_quizzes")
        .upsert({
          quiz_id: quiz.id,
          player_id: session.user.id,
          played_at: new Date()
        });

      setStatus({
        loading: false,
        markOptions: true
      });
    }
  };

  if (loading || loadingImage) return <div>Loading..</div>;
  if (!quiz || !questions || !imageUrl || error) return <div>Failed to fetch quiz</div>;

  return (
    <Section>
      <Container className="has-text-centered">
        <div className="block">
          <Heading>{quiz.name}</Heading>
          <Heading subtitle><i>By {quiz.author.name}</i></Heading>
          <Image
            src={imageUrl ?? undefined}
            className={styles.headingImage}
          />
        </div>

        <hr />

        <form onSubmit={handleSubmit}>
          {questions.map(({ id: qId, ...rest }) => (
            <div key={qId} className="block">
              <QuizQuestion
                selectedOption={selected.get(qId)?.id}
                shouldMark={status.markOptions}
                onToggle={toggleOption}
                {...rest}
              />

              <hr />
            </div>
          ))}

          <Button
            color="link"
            size="large"
            loading={status.loading}
            disabled={status.markOptions}
            type="submit"
          >Submit
          </Button>
          {quizError && <p className="has-text-danger">{quizError}</p>}
        </form>
      </Container>
    </Section>
  );
};

export default PlayPage;
