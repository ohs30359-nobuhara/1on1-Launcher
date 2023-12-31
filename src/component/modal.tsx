import React, {ReactNode} from "react";
import {Modal, Button} from "react-bootstrap";

interface ContentsModalProps {
  children: ReactNode;
  onHide: () => void;
  title: string
  show: boolean
}

export const ContentsModal: React.FC<ContentsModalProps> = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
