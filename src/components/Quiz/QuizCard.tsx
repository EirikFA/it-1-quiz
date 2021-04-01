import { useSupabase } from "@hooks";
import { FunctionComponent, useEffect, useState } from "react";
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
  const { storage } = useSupabase();
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/1600x900");

  const downloadImage = async (path: string): Promise<void> => {
    const { data } = await storage.from("quizzes").download(path);
    if (data) {
      const url = URL.createObjectURL(data);
      setImageUrl(url);
    }
  };

  useEffect(() => {
    if (imagePath) downloadImage(imagePath);
  }, [imagePath]);

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
