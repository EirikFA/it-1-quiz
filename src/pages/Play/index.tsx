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
  Box,
  Button,
  Columns,
  Container, Heading, Icon, Image, Section
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
    quiz?.image_url ?? "sample.png"
  );

  const [selected, setSelected] = useState<Map<number, QuestionOption>>(new Map());
  const toggleOption = (option: QuestionOption) => {
    setSelected(prev => {
      const newMap = new Map(prev);
      newMap.set(option.question_id, option);
      return newMap;
    });
  };

  const [quizError, setQuizError] = useState("");
  const [status, setStatus] = useState({
    loading: false,
    markOptions: false
  });
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

  if (loading) return <div>Loading..</div>;
  if (!quiz || !questions || error) return <div>Failed to fetch quiz</div>;

  return (
    <Section>
      <Container className="has-text-centered">
        <div className="block">
          <Heading>{quiz.name}</Heading>
          <Heading subtitle><i>By {quiz.author.name}</i></Heading>
          <Image
            src={imageUrl ?? undefined}
            className={`${styles.headingImage}${loadingImage ? " is-loading" : ""}`}
          />
        </div>

        <hr />

        <form onSubmit={handleSubmit}>
          {questions.map(({ id: qId, prompt, options }) => (
            <div key={qId} className="block">
              <Heading size={4}>{prompt}</Heading>

              <Columns multiline>
                {options.map((option, index) => {
                  let boxClass = styles.optionBox;

                  const forQuestion = selected.get(option.question_id);
                  const showCheck = forQuestion?.id === option.id;

                  if (forQuestion?.id === option.id) {
                    if (status.markOptions && !option.is_correct) {
                      boxClass = styles.incorrectOption;
                    } else boxClass = styles.selectedOption;
                  }

                  if (status.markOptions && option.is_correct) {
                    boxClass = styles.correctOption;
                  }

                  return (
                    <Columns.Column
                      key={option.id}
                      size={4}
                      offset={index % 2 === 0 ? 2 : undefined}
                    >
                      <Box
                        className={boxClass}
                        onClick={() => toggleOption(option)}
                      >
                        <label className={styles.optionLabel}>
                          {option.text}
                          <input type="checkbox" className="is-hidden" />
                          {showCheck && (
                            <Icon className={styles.optionIcon}>
                              <i className="fas fa-check" />
                            </Icon>
                          )}
                        </label>
                      </Box>
                    </Columns.Column>
                  );
                })}
              </Columns>

              <hr />
            </div>
          ))}

          <Button color="link" size="large" loading={status.loading} type="submit">Submit</Button>
          {quizError && <p className="has-text-danger">{quizError}</p>}
        </form>
      </Container>
    </Section>
  );
};

export default PlayPage;
