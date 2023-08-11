import React, {useState} from "react";
import { Container, Form, Button } from 'react-bootstrap';
import { AiOutlineSearch, AiOutlineDelete } from 'react-icons/ai';

interface BacklogProps {
}

export const BacklogPage: React.FC<BacklogProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleSearch = () => {
    // 検索ボタンが押されたときの処理
    console.log('Selected Date:', selectedDate);
    console.log('Selected Option:', selectedOption);
  };

  return (
    <Container>
      <div className="card" style={{padding: 20}}>
        <div className="d-flex align-items-center" style={{padding: 20}}>
          <div className="mr-3">
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="mr-3">
            <Form.Control as="select" value={selectedOption}>
              <option value="">選択してください</option>
              <option value="option1">オプション1</option>
              <option value="option2">オプション2</option>
              <option value="option3">オプション3</option>
            </Form.Control>
          </div>
          <Button variant="primary" size="sm" onClick={handleSearch}>検索</Button>
        </div>
        <table className="table">
          <thead>
          <tr>
            <th>実施日</th>
            <th>対象者</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>2023/11/11</td>
            <td>suzuki</td>
            <td>
              <Button variant="primary" size="sm" className="save-button" style={{marginRight: 10}}> 確認 <AiOutlineSearch className="menu-icon"/> </Button>
              <Button variant="danger" size="sm" className="save-button">  削除 <AiOutlineDelete className="menu-icon"/> </Button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </Container>
  )
}
