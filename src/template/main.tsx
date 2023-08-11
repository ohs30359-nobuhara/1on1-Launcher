import React, {ReactNode, useEffect, useState} from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { RiTeamLine } from 'react-icons/ri';
import { GiTalk } from 'react-icons/gi';
import { TbNotes } from 'react-icons/tb';
import { BsCheckCircle } from 'react-icons/bs';

const MainMenu: React.FC = () => {
  const [menuHeight, setMenuHeight] = useState<number>(window.innerHeight);

  const updateMenuHeight = () => {
    setMenuHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMenuHeight);
    return () => {
      window.removeEventListener('resize', updateMenuHeight);
    };
  }, []);

  const fontStyle: React.CSSProperties = {
    fontSize: "20px",
    color: "white"
  }

  const spanStyle: React.CSSProperties = {
    marginLeft: "20px"
  }

  const menuContainerStyle: React.CSSProperties = {
    height: `${menuHeight}px`, // ブラウザの高さに合わせる
    overflowY: 'auto', // メニューがブラウジングエリアを超えた場合にスクロールを有効にする
  };

  return (
    <div style={menuContainerStyle}>
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
    </div>
  );
};

export const MainTemplate: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <Container fluid className="p-0">
      <Row>
        <Col sm={3} style={{paddingTop: 30, backgroundColor: "#343A40", maxWidth: "250px"}}>
          <MainMenu/>
        </Col>
        <Col sm={9} className="p-4">
          {props.children}
        </Col>
      </Row>
    </Container>
  );
};
