import React from "react";
import {ReaderChart, RadarChartProps} from "../component/radarChart";
import {Card, Col, Container, Row} from "react-bootstrap";
import {MemberInterface} from "../domain/member";

export interface PersonnelProps {
  member: MemberInterface
}

export const Personnel: React.FC<PersonnelProps> = (props) => {
  if (!props.member.skillSet) {
    props.member.skillSet = {
      communication: 0, jobSkill: 0, management: 0, problemSolving: 0
    }
  }

  if (!props.member.priority) {
    props.member.priority = {
      engagementAndFulfillment: 0,
      financialStability: 0,
      popularity: 0,
      skillUp: 0,
      socialContribution: 0,
      workLifeBalance: 0
    }
  }

  const skillLevel: RadarChartProps = {
    values: {
      management: {
        value: props.member.skillSet.management,
        label: "マネジメント",
      },
      problemSolving: {
        value: props.member.skillSet.problemSolving,
        label: "課題解決",
      },
      communication: {
        value: props.member.skillSet.communication,
        label: "コミュニケーション",
      },
      jobSkill: {
        value: props.member.skillSet.jobSkill,
        label: "職務技能",
      },
    }
  }

  const priority: RadarChartProps = {
    values: {
      skillUp: {
        value: props.member.priority.skillUp,
        label: "能力向上",
      },
      financialStability: {
        value: props.member.priority.financialStability,
        label: "経済的安定",
      },
      workLifeBalance: {
        value: props.member.priority.workLifeBalance,
        label: "ワークライフバランス",
      },
      engagementAndFulfillment: {
        value: props.member.priority.engagementAndFulfillment,
        label: "面白さ、やりがい",
      },
      socialContribution: {
        value: props.member.priority.socialContribution,
        label: "社会的貢献",
      },
      popularity: {
        value: props.member.priority.popularity,
        label: "知名度",
      }
    }
  }

  return (
    <div>
      <Card>
        <Card.Header>基本情報</Card.Header>
        <Card.Body>
          <Card.Title>{props.member.account}</Card.Title>
          <p>■ 職位</p> {props.member.role}
          <p>■ 担当領域</p> {props.member.position}
        </Card.Body>
      </Card>

      <Card style={{marginTop: 20}}>
        <Card.Header>キャリア</Card.Header>
        <Card.Body>
          <p>■ 本人の意向</p>
          <pre> {props.member.personalPreference} </pre>
          <p>■ 育成方針</p>
          <pre> {props.member.growthStrategy} </pre>
          <p>■ ギャップフィルと対策</p>
          <pre> {props.member.closingTheGap} </pre>
        </Card.Body>
      </Card>

      <Card style={{marginTop: 20}}>
        <Card.Header>分析</Card.Header>
        <Card.Body>
          <Card.Text>
            <p>■ 能力</p>
            <div style={{height: "350px"}}>
              <Container>
                <Row>
                  <Col md={7}>
                    <pre>{props.member.skillAssessment}</pre>
                  </Col>
                  <Col md={5}>
                    <ReaderChart values={skillLevel.values}></ReaderChart>
                  </Col>
                </Row>
              </Container>

            </div>
            <p>■ プライオリティ</p>
            <div style={{height: "350px"}}>
              <Container>
                <Row>
                  <Col md={7}>
                    <pre>{props.member.priorityMemo}</pre>
                  </Col>
                  <Col md={5}>
                    <ReaderChart values={priority.values}></ReaderChart>
                  </Col>
                </Row>
              </Container>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card style={{marginTop: 20}}>
        <Card.Header>備考</Card.Header>
        <Card.Body>
          {props.member.remarks}
        </Card.Body>
      </Card>

    </div>
  )
}
