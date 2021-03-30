import { TextInput } from "@components/Form";
import { Quiz } from "@types";
import {
  ErrorMessage, Field, FieldArray, Form as FormikForm, FormikProps
} from "formik";
import { FunctionComponent, useState } from "react";
import {
  Button, Columns, Form, Icon
} from "react-bulma-components";

const QuizForm: FunctionComponent<FormikProps<Quiz> & { loading: boolean }> = ({
  values: { questions },
  errors,
  setFieldValue,
  loading
}) => {
  const [questionI, setQuestionI] = useState(0);
  const { options } = questions[questionI];

  const removeQuestion = (): void => {
    if (questionI > 0) {
      const newQuestions = questions.slice();
      newQuestions.splice(questionI, 1);
      setQuestionI(questionI - 1);
      setFieldValue("questions", newQuestions);
    }
  };

  const previousQuestion = (): void => {
    const newQuestionI = questionI - 1;
    if (newQuestionI >= 0) setQuestionI(newQuestionI);
  };

  const nextQuestion = (): void => {
    const newQuestionI = questionI + 1;
    if (questions[newQuestionI]) setQuestionI(newQuestionI);
    else {
      const newQuestions = questions.slice();

      newQuestions.push({
        prompt: "",
        options: [
          {
            text: "",
            is_correct: true
          },
          {
            text: "",
            is_correct: false
          }
        ]
      });

      setFieldValue("questions", newQuestions);
      setQuestionI(newQuestionI);
    }
  };

  return (
    <FormikForm>
      <Field name="name" label="Quiz name" placeholder="My quiz" component={TextInput} />

      <FieldArray name="questions">
        {() => (
          <div className="ml-4">
            <h4 className="title is-4">Questions</h4>
            <Columns>
              <Columns.Column>
                <h5 className="title is-5">Question #{questionI + 1}</h5>

                <Field
                  name={`questions[${questionI}].prompt`}
                  placeholder="Why do Java developers wear glasses?"
                  component={TextInput}
                />
              </Columns.Column>

              <Columns.Column>
                <FieldArray name={`questions[${questionI}].options`}>
                  {({ push, remove }) => {
                    const questionError = errors.questions
                      && typeof errors.questions !== "string"
                      ? errors.questions[questionI] : undefined;

                    const optionsError = typeof questionError !== "string"
                      && typeof questionError?.options === "string"
                      ? questionError.options : null;

                    return (
                      <div className="ml-4">
                        <h5 className="title is-5">
                          Options
                          <Icon
                            className="is-clickable has-text-link ml-3"
                            onClick={() => push({})}
                          >
                            <i className="fas fa-plus" />
                          </Icon>
                        </h5>

                        <Columns>
                          {options && options.map(({ is_correct }, oIndex) => (
                            // eslint-disable-next-line react/no-array-index-key
                            <Columns.Column key={oIndex} size={6}>
                              <Form.Field className="is-expanded">
                                <Form.Field className="has-addons">
                                  <Form.Control>
                                    <Button
                                      color={is_correct ? "success" : "danger"}
                                      type="button"
                                      onClick={() => {
                                        setFieldValue(`questions[${questionI}].options[${oIndex}].is_correct`, !is_correct);
                                      }}
                                    >
                                      <Icon>
                                        <i className={`fas fa-${is_correct ? "check" : "times"}`} />
                                      </Icon>
                                    </Button>
                                  </Form.Control>

                                  <Form.Control>
                                    <Field
                                      name={`questions[${questionI}].options[${oIndex}].text`}
                                      placeholder="Because they can't C#"
                                      as={Form.Input}
                                    />
                                  </Form.Control>

                                  <Form.Control>
                                    <Button
                                      color="danger"
                                      type="button"
                                      onClick={() => remove(oIndex)}
                                    >
                                      <Icon>
                                        <i className="fas fa-trash-alt" />
                                      </Icon>
                                    </Button>
                                  </Form.Control>
                                </Form.Field>

                                <ErrorMessage
                                  name={`questions[${questionI}].options[${oIndex}].text`}
                                  component="p"
                                  className="help is-danger"
                                />
                              </Form.Field>
                            </Columns.Column>
                          ))}
                        </Columns>

                        {optionsError && <p className="help is-danger">{optionsError}</p>}
                      </div>
                    );
                  }}
                </FieldArray>
              </Columns.Column>
            </Columns>

            <Columns>
              <Columns.Column>
                <Button
                  color="link"
                  disabled={questionI === 0}
                  type="button"
                  onClick={previousQuestion}
                >
                  Previous question
                </Button>
              </Columns.Column>

              <Columns.Column className="has-text-centered">
                <Button
                  color="danger"
                  disabled={questionI === 0}
                  type="button"
                  onClick={removeQuestion}
                >Remove question
                </Button>
              </Columns.Column>

              <Columns.Column className="has-text-right">
                <Button
                  color="link"
                  type="button"
                  onClick={nextQuestion}
                >
                  Next question
                </Button>
              </Columns.Column>
            </Columns>
          </div>
        )}
      </FieldArray>

      <Button color="link" loading={loading} type="submit" className="mt-6">Create quiz</Button>
    </FormikForm>
  );
};

export default QuizForm;
