import React, {useEffect, useState} from 'react';
import {
  Button,
  ButtonToolbar,
  Card,
  CloseButton,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row
} from 'react-bootstrap';
import {BsLightbulb} from "react-icons/bs";
import {CiStickyNote} from "react-icons/ci";
import {ContentsModal} from "../component/modal";
import {Overture} from "../component/overture";
import {IpcEventKey} from "../enum";
import {SaveMinutesEvent} from "../events/saveMinutes";
import {eventEmitter} from "../core/eventEmitter";
import {MemberInterface} from "../domain/member";
import {LoadMembersEvent} from "../events/loadMembers";
import {Timer} from "../component/timer";
import {BacklogIndexInterface, BacklogInterface} from "../domain/backlog";
import {LoadMinutesIndexEvent} from "../events/loadMinutesIndex";
import {LoadMinutesEvent} from "../events/loadMinutes";

const OneOnOnePage: React.FC = () => {
  const [member, setMember] = useState<string>('');
  const [members, setMembers] = useState<MemberInterface[]>([]);
  const [currentMeeting, setCurrentMeeting] = useState<string>('');
  const [nextAction, setNextAction] = useState<string>('');
  const [nextActionsList, setNextActionsList] = useState<string[]>([]);
  const [overtureModalShow, setOvertureModalShow] = React.useState(false);
  const [backlogModalShow, setBacklogModalShow] = React.useState(false);
  const [backlogs, setBacklogs] = useState<BacklogIndexInterface[]>([]);
  const [backlog, setBacklog] = useState<string>('');

  const handleSave = async () => {
    const payload: SaveMinutesEvent = {
      params: {
        body: currentMeeting,
        account: member
      },
      key: IpcEventKey.SaveBacklog
    }
    if (await eventEmitter<boolean>(payload)) {
      alert("保存に成功しました")
    }
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

  const handleLoadBacklog = async (date) => {
    const event: LoadMinutesEvent = {
      key: IpcEventKey.LoadBacklog,
      params: { member, date }
    }

    const resp: BacklogInterface = await eventEmitter<BacklogInterface>(event);
    setBacklog(resp.body);
  }

  useEffect(() => {
    (async () => {
      // メンバー情報の読み込み
      const event: LoadMembersEvent = {
        key: IpcEventKey.LoadMembers,
        params: null
      }
      const members: MemberInterface[] = await eventEmitter(event);
      setMembers(members);

      // 変更されないケースを考慮
      setMember(members[0].account);


      // バックログ情報の読み込み
      const loadBacklogEvent: LoadMinutesIndexEvent = {
        key: IpcEventKey.LoadBacklogIndex,
        params: null
      }

      const backlogs: BacklogIndexInterface[] = await eventEmitter(loadBacklogEvent);
      setBacklogs(backlogs);
    })();
  }, [])

  return (
    <Container className="my-4">
      <Row className="mt-1">
        <Col>
          <h3>議事録</h3>
          <Form.Control as="select"
                        value={member}
                        onChange={(e) => {
                          // メンバーを切り替えた際に現在表示している過去ログをクリアする (でないと他人の実施ログが残る)
                          setMember(e.target.value);
                          setBacklog("")
                        }}>

            {members.map((option) => (
              <option key={option.account} value={option.account}>
                {option.account}
              </option>
            ))}
          </Form.Control>

          <div className="textarea-toolbox mt-3">
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
            <h4>アクションアイテム</h4>
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

      <Timer></Timer>

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
        title={"1on1実施ログ"}
      >
        <div>
          <Form.Select onChange={(e) => handleLoadBacklog(e.target.value)}>
            {
              backlogs
              .filter(log => log.member == member)
              .map((log => <option>{log.date}</option>))
            }
          </Form.Select>
          <Card style={{marginTop: 30}}>
            <Card.Body>
              <Card.Text as="pre">{backlog}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </ContentsModal>

    </Container>
  );
};

export default OneOnOnePage;
