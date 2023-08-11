import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, CloseButton, InputGroup, Card } from 'react-bootstrap';

const OneOnOnePage: React.FC = () => {
  const [previousNotes, setPreviousNotes] = useState<string>('');
  const [currentMeeting, setCurrentMeeting] = useState<string>('');
  const [nextAction, setNextAction] = useState<string>('');
  const [nextActionsList, setNextActionsList] = useState<string[]>([]);

  const handleSave = () => {
    // 保存処理をここに実装する
    // データの保存、更新、ファイルの保存など
  };

  const handleAddNextAction = () => {
    if (nextAction.trim() !== '') {
      setNextActionsList([...nextActionsList, nextAction]);
      setNextAction('');
    }
  };

  const handleDeleteNextAction = (index: number) => {
    const updatedActions = nextActionsList.filter((_, i) => i !== index);
    setNextActionsList(updatedActions);
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <div className="previous-notes">
            <h2>前回の内容</h2>
            <Card>
              <Card.Body>{previousNotes}</Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <div className="current-meeting">
            <h2>議事録</h2>
            <Form>
              <Form.Group controlId="currentMeeting">
                <Form.Control
                  as="textarea"
                  rows={8}
                  value={currentMeeting}
                  onChange={(e) => setCurrentMeeting(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <div className="next-action">
            <h2>Next Action</h2>
            <Form>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  value={nextAction}
                  onChange={(e) => setNextAction(e.target.value)}
                />
                <Button variant="success" onClick={handleAddNextAction}>追加</Button>
              </InputGroup>
            </Form>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <div className="next-action-list">
            <ListGroup>
              {nextActionsList.map((action, index) => (
                <ListGroup.Item key={index} className="d-flex align-items-center">
                  <span className="flex-grow-1">{action}</span>
                  <CloseButton onClick={() => handleDeleteNextAction(index)} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <Button variant="primary" onClick={handleSave} className="save-button">
            保存
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default OneOnOnePage;
