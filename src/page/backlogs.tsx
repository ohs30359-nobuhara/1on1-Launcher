import React, {useEffect, useState} from "react";
import {Button, Container, Form} from 'react-bootstrap';
import {AiOutlineDelete, AiOutlineSearch} from 'react-icons/ai';
import {MemberInterface} from "../domain/member";
import {LoadMembersEvent} from "../events/loadMembers";
import {PageKey, IpcEventKey} from "../enum";
import {eventEmitter} from "../core/eventEmitter";
import {LoadMinutesIndexEvent} from "../events/loadMinutesIndex";
import {BacklogIndexInterface, BacklogInterface} from "../domain/backlog";
import {LoadMinutesEvent} from "../events/loadMinutes";
import {pageManager} from "../pageManager";
import {MinutesPagePros} from "./minutes";

interface BacklogsProps {
}

export const BacklogsPage: React.FC<BacklogsProps> = (props) => {
  const [members, setMembers] = useState<MemberInterface[]>([]);
  const [backlogs, setBacklogs] = useState<BacklogIndexInterface[]>([]);
  const [cacheBacklogs, setCacheBacklogs] = useState<BacklogIndexInterface[]>([]);

  const handleSearch = async (member: string) => {
    // 検索ボタンが押されたときの処理
    if (member.length === 0) {
      setBacklogs(cacheBacklogs);
    }
    setBacklogs(cacheBacklogs.filter(log => log.member === member));
  };

  const handleShow = async (date: string, member: string) => {
    const event: LoadMinutesEvent = {
      key: IpcEventKey.LoadBacklog,
      params: { date, member }
    }
    const minutes: BacklogInterface = await eventEmitter(event);
    pageManager.change<MinutesPagePros>(PageKey.Backlogs, {member: minutes.account, content: minutes.body, date: minutes.date})
  }

  useEffect(() => {
    (async () => {
      const event: LoadMembersEvent = {
        key: IpcEventKey.LoadMembers,
        params: null
      }
      const members: MemberInterface[] = await eventEmitter(event);
      setMembers(members);

      const loadBacklogEvent: LoadMinutesIndexEvent = {
        key: IpcEventKey.LoadBacklogIndex,
        params: null
      }
      const backlogs: BacklogIndexInterface[] = await eventEmitter(loadBacklogEvent);
      setBacklogs(backlogs);
      setCacheBacklogs(backlogs);
    })();
  }, [])

  return (
    <Container className={"mt-3"}>
      <div className="card mt-4" style={{padding: 20}}>
        <Form>
          <Form.Control as="select"
                        onChange={(e) => handleSearch(e.target.value) }>
            <option value="">選択してください</option>
            {
              members.map(member => {
                return <option value={member.account}>{member.account}</option>
              })
            }
          </Form.Control>
        </Form>

        <table className="table">
          <thead>
          <tr>
            <th>実施日</th>
            <th>対象者</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          {
            backlogs.map(backlog => {
              return (
                <tr>
                  <td>{backlog.date}</td>
                  <td>{backlog.member}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      className="save-button"
                      onClick={() => handleShow(backlog.date, backlog.member)}
                      style={{marginRight: 10}}> 確認 <AiOutlineSearch className="menu-icon"/>
                    </Button>
                    <Button variant="danger" size="sm" className="save-button">  削除 <AiOutlineDelete className="menu-icon"/> </Button>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    </Container>
  )
}
