import { useImageURL } from "@hooks";
import {
  FunctionComponent
} from "react";
import { Card, Content } from "react-bulma-components";
import { Link } from "wouter";

export interface QuizCardProps {
  id: number;
  author: string;
  name: string;
  imagePath?: string;
}

const QuizCard: FunctionComponent<QuizCardProps> = ({
  id, author, name, imagePath
}) => {
  const imageUrl = useImageURL(imagePath ?? "sample.png");

  return (
    <Card>
      <Card.Image size="16by9" src={imageUrl} alt="Quiz image" />

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
