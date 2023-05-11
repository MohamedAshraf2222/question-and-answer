import React from "react";
import { Accordion, Row } from "react-bootstrap";
import { question } from "../data";

const QAList = ({ deleteItem }) => {
  const localData = JSON.parse(localStorage.getItem("items"));
  const onDeleteItem = (id) => {
    const index = question.indexOf(id);
    question.splice(index, 1);
    deleteItem(question);
  };
  return (
    <Row>
      <Accordion>
        {localStorage.getItem("items") != null ? (
          localData.map((item, i) => (
            <Accordion.Item key={i} eventKey={i}>
              <Accordion.Header>
                <div className="mx-3">{item.q}</div>
              </Accordion.Header>
              <Accordion.Body className="text-end">
                <div className="px-3 d-inline">{item.a}</div>
                <button
                  onClick={() => {
                    onDeleteItem(item.id);
                  }}
                  className="btn"
                >
                  مسح السؤال
                </button>
              </Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <h2 className="fs-4 text-center p-5">لا يوجد اسئلة</h2>
        )}
      </Accordion>
    </Row>
  );
};

export default QAList;
