import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';

interface MemberProfileProps {
  name: string
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
            <h3 className="mb-0 mr-2">{props.name}</h3>
            <span className="text-muted">·</span>
            <span className="text-muted ml-2">assign {props.assignDate}</span>
          </div>
          <div className="d-flex align-items-center mt-2">
            <span className="text-muted">Last 1on1 was {calculateDaysAgo(props.last1on1Date)} days ago</span>
          </div>
        </div>
        <Button variant="outline-primary" className="ml-3">
          Start 1on1
        </Button>
      </div>
    </Card>
  )
}

const Members: React.FC = () => {
  const memberStatus: MemberProfileProps[] = [
    {name: "suzuki", last1on1Date: "2022/11/01", assignDate: "2023/08/03"},
    {name: "tanaka", last1on1Date: "2023/01/01", assignDate: "2023/08/01"},
  ]

  return (
    <Container>
      { memberStatus.map((m, i) =>
        (<MemberProfile key={i} name={m.name} assignDate={m.assignDate} last1on1Date={m.last1on1Date} />))
      }
    </Container>
  );
};

export default Members;
