import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import FormGroup from "../components/FormGroup";
import QAList from "../components/QAList";
import { question } from "../data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [data, setData] = useState(question);
  const [firstRender, setFirstRender] = useState(false);
  const onAdd = () => {
    localStorage.setItem("items", JSON.stringify([...question]));
    setData([...question]);
    notify("تم الاضافة بنجاح", "success");
  };
  const deleteAllItems = () => {
    localStorage.removeItem("items");
    question.splice(0, question.length);
    setData([]);
    notify("تم حذف كل الاسئلة بنجاح", "success");
  };
  const handleRefresh = () => {
    if (localStorage.getItem("items") != null) {
      const loData = JSON.parse(localStorage.getItem("items"));
      setData([...loData]);
      // for (let i = 0; i < loData.length; i++) {
      //   for (let j = 0; j < question.length; j++) {
      //     if (loData[i].id === question[j].id) {
      //     } else {
      //       question.push(loData[i]);
      //     }
      //   }
      // }
      question.push(...loData);
      console.log("Question from useEffect");
      console.log(question);
      console.log("called");
    }
  };

  useEffect(() => {
    if (!firstRender) {
      setFirstRender(true);
      handleRefresh();
    }
  }, []);

  const deleteItem = (items) => {
    localStorage.setItem("items", JSON.stringify([...items]));
    setData([...items]);
    if (items.length <= 0) {
      deleteAllItems();
    } else if (items.length > 0) {
      notify("تم حذف كل السؤال بنجاح", "success");
    }
  };
  const localData = JSON.parse(localStorage.getItem("items"));
  const notify = (message, type) => {
    if (type === "error") {
      toast.error(message);
    }
    if (type === "success") {
      toast.success(message);
    }
  };
  return (
    <>
      <div className="font text-center color-body">
        <Container className="p-5">
          <Row className="justify-content-center">
            <Col sm="4" className="">
              <div className="fs-3 text-center py-2">اسئلة واجوبة شائعة</div>
            </Col>
            <Col sm="8" className="">
              <FormGroup onAdd={onAdd} notify={notify} />
              <QAList deleteItem={deleteItem} />
              {localStorage.getItem("items") != null ? (
                <button
                  onClick={deleteAllItems}
                  className="btn w-100 my-3"
                  type="submit"
                >
                  مسح الكل
                </button>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </>
  );
};

export default Home;
