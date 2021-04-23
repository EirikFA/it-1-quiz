import QuizFilter from "@components/Quiz/QuizFilter";
import QuizList from "@components/Quiz/QuizList";
import { useQuizzes } from "@hooks";
import { SortBy } from "@hooks/useQuizzes";
import {
  FunctionComponent, useState
} from "react";
import { Container, Section } from "react-bulma-components";

const BrowsePage: FunctionComponent = () => {
  const [sortBy, setSortBy] = useState<SortBy>("created");
  const [query, setQuery] = useState("");
  const {
    loading, error, data: quizzes, refetch
  } = useQuizzes(undefined, undefined, sortBy, query);

  if (loading) return <div>Loading..</div>;
  if (!quizzes || error) return <div>Failed to fetch quizzes</div>;

  return (
    <Section>
      <Container>
        <QuizFilter
          sortBy={sortBy}
          onSortChange={e => setSortBy(e.target.value as SortBy)}
          query={query}
          onQueryChange={e => setQuery(e.target.value)}
          onSearch={refetch}
        />

        <QuizList quizzes={quizzes} />
      </Container>
    </Section>
  );
};

export default BrowsePage;
