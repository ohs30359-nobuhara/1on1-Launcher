import React, {JSX, useEffect, useState} from 'react';
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
           pageManager.getPage().filter(page => page.menu).map(page => {
             return (
               <Nav.Link eventKey="link" className="d-flex align-items-center" style={fontStyle} onClick={() => pageManager.change(page.key)}>
                 {page.menu.menuIcon}
                 <span className="ml-2" style={spanStyle}>{page.menu.menuTitle}</span>
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
  const [pageProps, setPageProps] = useState({});

  // ページマネージャーにページ一覧と更新用のメソッドを登録
  pageManager.setOption(props.pages, (page, pageOption) => {
      setPage(page);
      setPageProps(pageOption);
  });

  return (
    <Container fluid className="p-0">
      <Row>
        <Col sm={3} className={"mainMenu"}>
          <MainMenu/>
        </Col>
        <Col sm={9} className="p-4 mainContents">
          {page && React.cloneElement(page, {...pageProps})}
        </Col>
      </Row>
    </Container>
  );
};
