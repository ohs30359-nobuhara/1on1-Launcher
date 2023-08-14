import React, {useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {eventEmitter} from "../core/eventEmitter";
import {IpcEventKey} from "../enum";
import {SaveMemberEvent} from "../events/saveMember";

export const AddMember: React.FC<any> = (props) => {
  const [account, setAccount] = useState("");
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

  return (
    <Container className="my-4 mt-4">
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Account</Form.Label>
          <Form.Control type="text" value={account} onChange={(e) => setAccount(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </Form>

      <Button variant="primary" onClick={handleSave} className="save-button">
        保存する
      </Button>
    </Container>
  )
}
