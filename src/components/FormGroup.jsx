import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { question } from "../data";

const FormGroup = ({ onAdd, notify }) => {
  const [qu, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const addItem = () => {
    if (qu === "" || answer === "") {
      notify("من فضلك اكمل البيانات", "error");
      return;
    }
    question.push({ id: Math.random(), q: qu, a: answer });
    setQuestion("");
    setAnswer("");
    onAdd();
    // console.log(question);
  };
  return (
    <Row className="my-3">
      <Col sm="5">
        <Form.Control
          onChange={(e) => setQuestion(e.target.value)}
          value={qu}
          type="text"
          placeholder="ادخل السؤال"
        />
      </Col>
      <Col sm="5">
        <Form.Control
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
          type="text"
          placeholder="ادخل الاجابة"
        />
      </Col>
      <Col sm="2">
        <Button onClick={() => addItem()} className="btn w-100" type="submit">
          اضافة
        </Button>
      </Col>
    </Row>
  );
};

export default FormGroup;
