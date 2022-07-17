import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
} from "reactstrap";
import { createDataByPath } from "../../../service/data";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import ReactBSAlert from "react-bootstrap-sweetalert";
import { BarChart } from "@material-ui/icons";
import { newDateConvertToFormat } from "../../../service/formatData";

const status = [
  {
    id: 1,
    text: "Past",
  },
  {
    id: 2,
    text: "On going",
  },
  {
    id: 3,
    text: "Future",
  },
];

function CreateSemester() {
  const [semesterID, setSemesterID] = useState("");
  const [semesterName, setSemesterName] = useState("");
  const [startDate, setStartDate] = useState(
    newDateConvertToFormat(new Date())
  );
  const [endDate, setEndDate] = useState(newDateConvertToFormat(new Date()));
  const [statusId, setStatusId] = useState(3);
  const [alert, setalert] = useState(false);
  const history = useHistory();

  const successAlert = (message) => {
    setalert(
      <ReactBSAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title={message}
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        showConfirm={false}
        showCancel={false}
        confirmBtnBsStyle="success"
        confirmBtnText="Ok"
        btnSize=""
      ></ReactBSAlert>
    );
  };

  const warningAlert = (message) => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title={message}
        onConfirm={() => setalert(null)}
        onCancel={() => setalert(null)}
        confirmBtnBsStyle="warning"
        confirmBtnText="Ok"
        btnSize=""
      ></ReactBSAlert>
    );
  };

  const checkValidation = () => {
    if (semesterID.trim() === "") {
      warningAlert("Semester ID must not empty!");
      return false;
    } else if (semesterName.trim() === "") {
      warningAlert("Semester Name must not empty!");
      return false;
    }
    return true;
  };

  const dataForCreate = () => {
    return {
      semesterId: semesterID,
      semesterName: semesterName,
      startDate: startDate,
      endDate: endDate,
      statusId: parseInt(statusId),
    };
  };

  async function createDataSemester() {
    if (localStorage && localStorage.getItem("accessToken")) {
      if (checkValidation()) {
        const accessToken = localStorage.getItem("accessToken");
        const data = dataForCreate();
        const path = "api/v1/semesters";
        const res = await createDataByPath(path, accessToken, data);
        if (res && res.status === 200) {
          successAlert("Create Semester Successfully!");
          setTimeout(() => {
            history.push("/semester");
          }, 2000);
        } else {
          warningAlert("An error when create");
        }
      }
    }
  }

  return (
    <>
      {alert}
      <Topbar />
      <Sidebar />
      <Container className="mt-3">
        <Card>
          <CardHeader>
            <CardTitle>
              <a
                className="text-default font-weight-bold"
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  history.push("/semester");
                }}
              >
                <BarChart className="sidebarIcon" /> Semster &gt;
              </a>
              <span className="text-default font-weight-bold">
                {" "}
                Create Semester
              </span>
            </CardTitle>
            <span className="display-3">Create Semester</span>
          </CardHeader>
          <CardBody>
            <Row className="mb-3">
              <Col md="12">
                <Row>
                  <Col md="12">
                    <div className="input-box mb-3">
                      <span className="details">ID</span>{" "}
                      <Input
                        className="text-defautl text-lg"
                        type="text"
                        value={semesterID}
                        onChange={(e) => {
                          setSemesterID(e.target.value);
                        }}
                        placeholder="Enter ID Semester"
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="input-box mb-3">
                      <span className="details">Semester Name</span>{" "}
                      <Input
                        className="text-defautl text-lg"
                        type="text"
                        value={semesterName}
                        onChange={(e) => {
                          setSemesterName(e.target.value);
                        }}
                        placeholder="Enter Semester Name"
                        required
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <div className="input-box mb-3">
                      <span className="details">Start Time</span>
                      <Input
                        className="text-default text-lg"
                        defaultValue={startDate}
                        type="datetime-local"
                        onChange={(e) => {
                          setStartDate(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="input-box mb-3">
                      <span className="details">End Time</span>
                      <Input
                        className="text-default text-lg"
                        defaultValue={endDate}
                        type="datetime-local"
                        onChange={(e) => {
                          setEndDate(e.target.value);
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="input-box mb-3">
                      <span className="detail"> Semester</span>
                      {status ? (
                        <Input
                          type="select"
                          style={{ fontSize: "20px" }}
                          value={statusId}
                          onChange={(e) => {
                            setStatusId(e.target.value);
                          }}
                        >
                          {status.map((e) => {
                            return (
                              <option key={`option${e.id}`} value={e.id}>
                                {e.text}
                              </option>
                            );
                          })}
                        </Input>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="text-center" md="12" lg="12">
                <Button
                  color="success"
                  outline
                  onClick={() => createDataSemester()}
                >
                  Create Semester
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
export default CreateSemester;
