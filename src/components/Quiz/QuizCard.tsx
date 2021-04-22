import { useFileURL } from "@hooks";
import {
  FunctionComponent
} from "react";
import { Card, Content } from "react-bulma-components";
import { Link } from "wouter";

import styles from "./QuizCard.module.scss";

export interface QuizCardProps {
  id: number;
  author: string;
  name: string;
  imagePath?: string;
}

const QuizCard: FunctionComponent<QuizCardProps> = ({
  id, author, name, imagePath
}) => {
  const { loading: loadingImage, url: imageUrl } = useFileURL("quizzes", `${imagePath}` ?? "sample.png");

  return (
    <Card>
      <Card.Image
        size="16by9"
        src={imageUrl ?? undefined}
        className={`${styles.cardImage}${loadingImage ? " is-loading" : ""}`}
      />

      <Card.Content>
        <Content>
          <h3>{name}</h3>
          <i>Created by {author}</i>
        </Content>
      </Card.Content>

      <Card.Footer>
        <Card.Footer.Item renderAs={Link} href={`/play/${id}`}>Play quiz
        </Card.Footer.Item>
      </Card.Footer>
    </Card>
  );
};

export default QuizCard;
