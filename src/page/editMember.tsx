import React, {CSSProperties, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {eventEmitter} from "../core/eventEmitter";
import {IpcEventKey} from "../enum";
import {SaveMemberEvent} from "../events/saveMember";
import {PointsDistributionComponent} from "../component/pointsDistribution";
import {SkillForm} from "../component/skillForm";

export const EditMember: React.FC<any> = (props) => {
  const [account, setAccount] = useState("");
  const [skills, setSkills] = useState({

  })


  const handleSave = async () => {
    const event: SaveMemberEvent = {
      key: IpcEventKey.SaveMember,
      params: {account}
    }

    if (!await eventEmitter(event)) {
      return alert("登録に失敗しました");
    }
    setAccount("");
    alert("登録完了しました");
  }

  const headlineCss: CSSProperties = {
    borderBottom: "1px solid",
    paddingBottom: "15px",
    marginBottom: "15px"
  }

  return (
    <Container className="my-4 mt-4">
      <Form>
        <h3 style={headlineCss}>基本情報</h3>
        <Form.Group className="mb-3">
          <Form.Label>■ アカウント</Form.Label>
          <Form.Control type="text" value={account} onChange={(e) => setAccount(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>■ 職位</Form.Label>
          <Form.Control type="text" value={account} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>■ 担当領域</Form.Label>
          <Form.Control type="text" value={account} />
        </Form.Group>

        <h3 style={headlineCss}>キャリア</h3>
        <Form.Group className="mb-3">
          <Form.Label>■ 本人の意向</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>■ 育成方針</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>■ ギャップフィルと対策</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <h3 style={headlineCss}>能力</h3>

        <Form.Group className="mb-3">
          <Form.Label>■ スキル評価</Form.Label>
          <PointsDistributionComponent
            maxPoints={10} items={["A", "B", "C"]}
            onItemAllocationChange={(e) => console.log(e)}>
          </PointsDistributionComponent>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>■ プライオリティ</Form.Label>
          <SkillForm></SkillForm>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>■ 見解</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <h3 style={headlineCss}>備考</h3>

        <Form.Group className="mb-3">
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

      </Form>

      <Button variant="primary" onClick={handleSave} className="save-button">
        保存する
      </Button>
    </Container>
  )
}
