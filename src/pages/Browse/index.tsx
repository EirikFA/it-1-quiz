import QuizList from "@components/Quiz/QuizList";
import { useQuizzes } from "@hooks";
import {
  FunctionComponent
} from "react";
import { Container, Section } from "react-bulma-components";

const BrowsePage: FunctionComponent = () => {
  const { loading, error, data: quizzes } = useQuizzes();

  if (loading) return <div>Loading..</div>;
  if (!quizzes || error) return <div>Failed to fetch quizzes</div>;

  return (
    <Section>
      <Container>
        <QuizList quizzes={quizzes} />
      </Container>
    </Section>
  );
};

export default BrowsePage;
