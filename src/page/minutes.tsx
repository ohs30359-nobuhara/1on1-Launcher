import React from 'react';
import { Container, Card } from 'react-bootstrap';

export interface MinutesPagePros {
  date: string;
  member: string;
  content: string
}

export const MinutesPage: React.FC<MinutesPagePros> = (props) => {
  return (
    <Container className={"mt-3"}>
      <h2>1on1 議事録 {props.date}</h2>
      <h4>対象者: {props.member}</h4>

      <Card className={"mt-4"}>
        <Card.Body>
          <Card.Text as="pre">{props.content}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

