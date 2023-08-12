import React, {JSX, ReactNode, useEffect, useState} from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import {pageManager, PageOption} from "../pageManager";

const MainMenu: React.FC = () => {
  const [menuHeight, setMenuHeight] = useState<number>(window.innerHeight);

  const updateMenuHeight = () => {
    setMenuHeight(window.innerHeight);
  };

  // メニューの高さをリサイズに合わせてbrowserの高さに揃える
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
       <Nav className="flex-column">
         {
           pageManager.getPage().map(page => {
             return (
               <Nav.Link eventKey="link" className="d-flex align-items-center" style={fontStyle} onClick={() => pageManager.change(page.key)}>
                 {page.menuIcon}
                 <span className="ml-2" style={spanStyle}>{page.menuTitle}</span>
               </Nav.Link>
             )
           })
         }
      </Nav>
    </div>
  );
};

export const MainTemplate: React.FC<{ pages: PageOption[] }> = (props) => {
  const [page, setPage] = useState<JSX.Element | null>(null);

  // ページマネージャーにページ一覧と更新用のメソッドを登録
  pageManager.setOption(props.pages, (page) => setPage(page.component))

  return (
    <Container fluid className="p-0">
      <Row>
        <Col sm={3} style={{paddingTop: 30, backgroundColor: "#343A40", maxWidth: "250px"}}>
          <MainMenu/>
        </Col>
        <Col sm={9} className="p-4">
          {page}
        </Col>
      </Row>
    </Container>
  );
};
