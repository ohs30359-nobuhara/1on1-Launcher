import React, {useState} from 'react';
import {Button, ButtonToolbar, CloseButton, Col, Container, Form, InputGroup, ListGroup, Row} from 'react-bootstrap';
import {BsLightbulb} from "react-icons/bs";
import {CiStickyNote} from "react-icons/ci";
import {ContentsModal} from "../component/modal";
import {Overture} from "../component/overture";
import {IpcEventKey} from "../enum";
import {SaveMinutesEvent} from "../events/saveMinutes";

const OneOnOnePage: React.FC = () => {
  const [previousNotes, setPreviousNotes] = useState<string>('');
  const [currentMeeting, setCurrentMeeting] = useState<string>('');
  const [nextAction, setNextAction] = useState<string>('');
  const [nextActionsList, setNextActionsList] = useState<string[]>([]);
  const [overtureModalShow, setOvertureModalShow] = React.useState(false);
  const [backlogModalShow, setBacklogModalShow] = React.useState(false);

  const handleSave = () => {
    const payload: SaveMinutesEvent = {
      params: currentMeeting,
      key: IpcEventKey.SaveMinutes
    }
    window.electron.send('ipcEvent', payload);
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
      <Row className="mt-1">
        <Col>
          <h3>議事録</h3>
          <div className="textarea-toolbox">
            <ButtonToolbar>
              <Button variant="link" className="mr-3" onClick={() => setOvertureModalShow(true)}>
                <BsLightbulb className="menu-icon textarea-toolbox-item"/>
              </Button>
              <Button variant="link" onClick={() => setBacklogModalShow(true)}>
                <CiStickyNote className="menu-icon textarea-toolbox-item"/>
              </Button>
              {/* 他の編集ツールのボタンを追加 */}
            </ButtonToolbar>
          </div>
          <Form>
            <Form.Group controlId="currentMeeting">
              <Form.Control
                as="textarea"
                rows={8}
                value={currentMeeting}
                onChange={(e) => setCurrentMeeting(e.target.value)}
                style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <div className="next-action">
            <h2>アクションアイテム</h2>
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
      <Row className="mt-2">
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
      <Row className="mt-4">
        <Col>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={handleSave} className="save-button">
              保存する
            </Button>
          </div>
        </Col>
      </Row>

      <ContentsModal
        show={overtureModalShow}
        onHide={() => setOvertureModalShow(false)}
        title={"話したい議題を選んでください"}
      >
        <Overture />
      </ContentsModal>

      <ContentsModal
        show={backlogModalShow}
        onHide={() => setBacklogModalShow(false)}
        title={"前回の1on1"}
      >
        <div></div>
      </ContentsModal>

    </Container>
  );
};

export default OneOnOnePage;
