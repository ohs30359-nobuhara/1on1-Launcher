import React from "react";
import {ReaderChart, RadarChartProps} from "../component/radarChart";
import {Card, Col, Container, Row} from "react-bootstrap";

export const Personnel: React.FC = () => {
  const skillLevel: RadarChartProps = {
    values: {
      management: {
        value: 0,
        label: "マネジメント",
      },
      problemSolving: {
        value: 1,
        label: "課題解決",
      },
      communication: {
        value: 2,
        label: "コミュニケーション",
      },
      jobSkill: {
        value: 5,
        label: "職務技能",
      },
    }
  }

  const priority: RadarChartProps = {
    values: {
      skillUp: {
        value: 1,
        label: "能力向上",
      },
      financialStability: {
        value: 0,
        label: "経済的安定",
      },
      workLifeBalance: {
        value: 0,
        label: "ワークライフバランス",
      },
      engagementAndFulfillment: {
        value: 4,
        label: "面白さ、やりがい",
      },
      socialContribution: {
        value: 0,
        label: "社会的貢献",
      },
      popularity: {
        value: 3,
        label: "知名度",
      }
    }
  }

  return (
    <div>
      <Card>
        <Card.Header>基本情報</Card.Header>
        <Card.Body>
          <Card.Title>ynobuhar</Card.Title>
          <p>■ 職位</p>
          <p>■ 担当領域</p>
        </Card.Body>
      </Card>

      <Card style={{marginTop: 20}}>
        <Card.Header>キャリア</Card.Header>
        <Card.Body>
          <p>■ 本人の意向</p>
          <p>■ 育成方針</p>
          <p>■ ギャップフィルと対策</p>
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
                  <Col md={7}></Col>
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
                  <Col md={7}></Col>
                  <Col md={5}>
                    <ReaderChart values={priority.values}></ReaderChart>
                  </Col>
                </Row>
              </Container>
            </div>
            <p>■ 見解</p>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card style={{marginTop: 20}}>
        <Card.Header>備考</Card.Header>
        <Card.Body>
        </Card.Body>
      </Card>

    </div>
  )
}
