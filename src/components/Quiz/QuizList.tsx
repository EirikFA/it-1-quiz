import { Definitions } from "@types";
import { FunctionComponent } from "react";
import { Columns } from "react-bulma-components";

import QuizCard from "./QuizCard";

export type QuizItem = Omit<Definitions["quizzes"], "author_id"> & {
  author: {
    id: string;
    name: string;
  }
};

export interface QuizListProps {
  quizzes: QuizItem[];
}

const QuizList: FunctionComponent<QuizListProps> = ({ quizzes }) => (
  <Columns>
    {quizzes.map(({
      id, author, name, image_url
    }) => (
      <Columns.Column key={id} size={4}>
        <QuizCard id={id} author={author.name} name={name} imagePath={image_url} />
      </Columns.Column>
    ))}
  </Columns>
);

export default QuizList;
