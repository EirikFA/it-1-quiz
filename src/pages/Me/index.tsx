import { addQuiz } from "@api/quiz";
import { quizSchema } from "@api/validation";
import QuizForm from "@components/Form/Quiz";
import { useSession, useSupabase } from "@hooks";
import { QuizInput } from "@types";
import { Formik } from "formik";
import { FunctionComponent, useState } from "react";
import {
  Button, Container, Heading, Icon, Section
} from "react-bulma-components";
import { TypeOf } from "yup";

const initialForm: TypeOf<typeof quizSchema> = {
  name: "",
  image: undefined,
  questions: [
    {
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
    }
  ]
};

const MePage: FunctionComponent = () => {
  const [isFormActive, setIsFormActive] = useState(false);
  const [formStatus, setFormStatus] = useState({
    error: false,
    loading: false,
    msg: ""
  });
  const supabase = useSupabase();
  const session = useSession();

  if (!session?.user) return <p>Loading..</p>;

  return (
    <Section>
      <Container>
        <Heading>My quizzes</Heading>
        <Heading subtitle>View, create and edit your quizzes</Heading>
        <Button color="link" className="mb-2" onClick={() => setIsFormActive(!isFormActive)}>
          <span>Create new quiz</span>
          <Icon>
            <i className={`fas fa-chevron-${isFormActive ? "up" : "down"}`} />
          </Icon>
        </Button>

        <Formik
          validateOnChange={false}
          initialValues={initialForm}
          validationSchema={quizSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setFormStatus({
              error: false,
              loading: true,
              msg: ""
            });

            try {
              const fileExt = (values.image as File).name.split(".").pop();
              const fileName = `image-${Math.random()}.${fileExt}`;
              const filePath = `${session.user.id}/${fileName}`;

              await supabase.storage
                .from("quizzes")
                .upload(filePath, values.image);

              const data = {
                ...values,
                image: undefined,
                image_url: filePath
              };

              await addQuiz(
                supabase,
                // After validation
                data as unknown as QuizInput,
                session.user.id
              );

              setIsFormActive(false);
              setFormStatus({
                error: false,
                loading: false,
                msg: "Quiz created successfully!"
              });
              resetForm();
            } catch (e) {
              setFormStatus({
                error: true,
                loading: false,
                msg: "Error occurred, please check validation"
              });
            }

            setSubmitting(false);
          }}
        >
          {props => isFormActive && <QuizForm {...props} loading={formStatus.loading} />}
        </Formik>

        {formStatus.msg
          && <p className={`mt-4 has-text-${formStatus.error ? "danger" : "success"}`}>{formStatus.msg}</p>}
      </Container>
    </Section>
  );
};

export default MePage;
