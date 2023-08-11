import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { RiTeamLine } from 'react-icons/ri';
import { GiTalk } from 'react-icons/gi';
import { TbNotes } from 'react-icons/tb';
import { BsCheckCircle } from 'react-icons/bs';
import OneOnOnePage from "../page/1on1";

const MainMenu: React.FC = () => {

  const fontStyle: React.CSSProperties = {
    fontSize: "20px"
  }

  const spanStyle: React.CSSProperties = {
    marginLeft: "20px"
  }

  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link eventKey="link" className="d-flex align-items-center" style={fontStyle}>
        <RiTeamLine className="menu-icon" />
        <span className="ml-2" style={spanStyle}>Members</span>
      </Nav.Link>
      <Nav.Link eventKey="link" className="d-flex align-items-center" style={fontStyle}>
        <GiTalk className="menu-icon" />
        <span className="ml-2" style={spanStyle}>1on1</span>
      </Nav.Link>
      <Nav.Link eventKey="link" className="d-flex align-items-center" style={fontStyle}>
        <TbNotes className="menu-icon" />
        <span className="ml-2" style={spanStyle}>Backlog</span>
      </Nav.Link>
      <Nav.Link eventKey="link" className="d-flex align-items-center" style={fontStyle}>
        <BsCheckCircle className="menu-icon" />
        <span className="ml-2" style={spanStyle}>Action Items</span>
      </Nav.Link>
    </Nav>
  );
};

export const MainTemplate: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <Container fluid className="p-0">
      <Row>
        <Col sm={1} className="bg-light"></Col>
        <Col sm={2} className="bg-light" style={{marginTop: 30}}>
          <MainMenu/>
        </Col>
        <Col sm={9} className="p-4">
          {props.children}
        </Col>
      </Row>
    </Container>
  );
};
