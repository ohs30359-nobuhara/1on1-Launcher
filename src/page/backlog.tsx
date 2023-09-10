import React, {useEffect, useState} from "react";
import {Button, Container, Form} from 'react-bootstrap';
import {AiOutlineDelete, AiOutlineSearch} from 'react-icons/ai';
import {MemberInterface} from "../domain/member";
import {LoadMembersEvent} from "../events/loadMembers";
import {PageKey, IpcEventKey} from "../enum";
import {eventEmitter} from "../core/eventEmitter";
import {LoadMinutesIndexEvent} from "../events/loadMinutesIndex";
import {MinutesIndexInterface, MinutesInterface} from "../domain/minutes";
import {LoadMinutesEvent} from "../events/loadMinutes";
import {pageManager} from "../pageManager";
import {MinutesPagePros} from "./minutes";

interface BacklogProps {
}

export const BacklogPage: React.FC<BacklogProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [members, setMembers] = useState<MemberInterface[]>([]);
  const [backlogs, setBacklogs] = useState<MinutesIndexInterface[]>([]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleSearch = () => {
    // 検索ボタンが押されたときの処理
    console.log('Selected Date:', selectedDate);
    console.log('Selected Option:', selectedMember);
  };

  const handleShow = async (date: string, member: string) => {
    const event: LoadMinutesEvent = {
      key: IpcEventKey.LoadMinutes,
      params: { date, member }
    }
    const minutes: MinutesInterface = await eventEmitter(event);
    pageManager.change<MinutesPagePros>(PageKey.Minutes, {member: minutes.account, content: minutes.body, date: minutes.date})
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
        key: IpcEventKey.LoadMinutesIndex,
        params: null
      }

      const backlogs: MinutesIndexInterface[] = await eventEmitter(loadBacklogEvent);
      setBacklogs(backlogs);
    })();
  }, [])

  return (
    <Container className={"mt-3"}>
      <div className="card mt-4" style={{padding: 20}}>
        <div className="d-flex align-items-center" style={{padding: 20}}>
          <div className="mr-3">
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="mr-3">
            <Form.Control as="select"
                          value={selectedMember}
                          onChange={(e) => { setSelectedMember(e.target.value) }}>
              <option value="">選択してください</option>
              {
                members.map(member => {
                  return (
                    <option value={member.account}>{member.account}</option>
                  )
                })
              }
            </Form.Control>
          </div>
          <Button variant="primary" size="sm" onClick={handleSearch}>検索</Button>
        </div>
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
