import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export interface PointsDistributionProps {
  maxPoints: number; // 上限ポイントを外部から指定
  items: string[]; // 割り振れる項目を外部から指定
  onItemAllocationChange: (allocations: { [key: string]: number }) => void; // 割り振り値を親コンポーネントに渡すコールバック
}

export const PointsDistributionComponent: React.FC<PointsDistributionProps> = (props) => {
  const initialAllocations: { [key: string]: number } = {};
  props.items.forEach((item) => {
    initialAllocations[item] = 0; // 初期値を0に設定
  });

  const [allocations, setAllocations] = useState(initialAllocations);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, attribute: string) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= props.maxPoints) {
      const updatedAllocations = {
        ...allocations,
        [attribute]: newValue,
      };
      setAllocations(updatedAllocations);
      props.onItemAllocationChange(updatedAllocations); // 親コンポーネントに割り振り値を渡す
    }
  };

  const allocationsArray = Object.keys(allocations).map((key) => allocations[key]);
  const totalPoints = allocationsArray.reduce((total, value) => total + value, 0);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form>
            {props.items.map((item) => (
              <Form.Group key={item} style={{marginBottom: "10px"}}>
                <Form.Label>{item}</Form.Label>
                <Form.Control
                  type="number"
                  value={allocations[item]}
                  onChange={(event) => handleChange(event as any, item)}
                />
              </Form.Group>
            ))}
          </Form>
        </Col>
        <Col md={6}>
          <div>
            <strong>Total Points: {totalPoints}</strong>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
