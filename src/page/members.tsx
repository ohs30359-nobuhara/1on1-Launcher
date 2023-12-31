import React, {useEffect, useState} from 'react';
import {Button, Card, Container} from 'react-bootstrap';
import {eventEmitter} from "../core/eventEmitter";
import {LoadMembersEvent} from "../events/loadMembers";
import {PageKey, IpcEventKey} from "../enum";
import {Member, MemberInterface} from "../domain/member";
import {pageManager} from "../pageManager";
import {EditMemberProps} from "./editMember";
import {PersonnelProps} from "./personnel";

interface MemberProfileProps {
  member: MemberInterface
  assignDate: string
  last1on1Date: string
}

/**
 * MemberProfile Component
 * @constructor
 */
const MemberProfile: React.FC<MemberProfileProps> = (props) => {
  // "YYYY/MM/DD"形式の日付文字列を受け取り、現在の日付との差を計算
  function calculateDaysAgo(targetDateStr: string): number {
    const targetDate: Date = new Date(targetDateStr);
    const currentDate: Date = new Date();

    const timeDifference: number = currentDate.getTime() - targetDate.getTime();
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  }

  return (
    <Card className="mb-4">
      <div className="d-flex align-items-start p-3">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center">
            <h3 className="mb-0 mr-2">{props.member.account}</h3>
            <span className="text-muted">·</span>
            <span className="text-muted ml-2">assign {props.assignDate}</span>
          </div>
          <div className="d-flex align-items-center mt-2">
            <span className="text-muted">Last 1on1 was {calculateDaysAgo(props.last1on1Date)} days ago</span>
          </div>
        </div>
        <Button variant="outline-primary" className="ml-3" onClick={() => pageManager.change<PersonnelProps>(PageKey.Personnel, {member: props.member as Member})}>詳細</Button>
        <Button variant="outline-primary" className="ml-3" style={{marginLeft: "15px"}} onClick={() => pageManager.change<EditMemberProps>(PageKey.EditMember, {member: props.member})}>編集</Button>
      </div>
    </Card>
  )
}

const Members: React.FC = () => {
  const [members, setMembers] = useState<MemberInterface[]>([]);

  useEffect(() => {
    (async () => {
      const event: LoadMembersEvent = {
        key: IpcEventKey.LoadMembers,
        params: null
      }

      const members: MemberInterface[] = await eventEmitter(event)
      setMembers(members);
    })();
  }, [])

  return (
    <Container>
      { members.map((m, i) =>
        (<MemberProfile key={i} member={m} assignDate={"---"} last1on1Date={"---"} />))
      }
    </Container>
  );
};

export default Members;
