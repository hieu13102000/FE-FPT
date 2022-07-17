import React, { useEffect } from "react";
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
import { createDataByPath, getDataByPathTest } from "../../../service/data";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import ReactBSAlert from "react-bootstrap-sweetalert";
import { Apartment } from "@material-ui/icons";

function CreateCompany() {
  const [industries, setIndustries] = useState(null);
  const [industriesList, setIndustriesList] = useState(null);
  const [semesters, setSemesters] = useState(null);
  const [semestersList, setSemestersList] = useState(null);
  const [companyID, setCompanyID] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [companyWebsite, setcompanyWebsite] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [alert, setalert] = useState(false);
  const history = useHistory();

  async function loadDataIndustry(accessToken) {
    if (accessToken) {
      const path = `api/v1/industries`;
      const res = await getDataByPathTest(path, accessToken, "");
      console.log(res);
      if (res !== null && res !== undefined && res.status === 200) {
        if (res.data.length > 0) {
          setIndustries(res.data[0].industryId);
          setIndustriesList(res.data);
        }
      }
    }
  }
  async function loadDataSemester(accessToken) {
    if (accessToken) {
      const path = `api/v1/semesters`;
      const res = await getDataByPathTest(path, accessToken, "");
      console.log(res);
      if (res !== null && res !== undefined && res.status === 200) {
        if (res.data.length > 0) {
          setSemesters(res.data[0].semesterId);
          setSemestersList(res.data);
        }
      }
    }
  }

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
    if (companyID.trim() === "") {
      warningAlert("Company ID must not empty!");
      return false;
    } else if (companyName.trim() === "") {
      warningAlert("Company Name must not empty!");
      return false;
    }
    return true;
  };

  const dataForCreate = () => {
    return {
      businessId: companyID,
      businessName: companyName,
      website: companyWebsite,
      contactPhone: contactPhone,
      contactEmail: contactEmail,
      industryId: industries,
      semesterId: semesters,
    };
  };

  async function createDataCompany() {
    if (localStorage && localStorage.getItem("accessToken")) {
      if (checkValidation()) {
        const accessToken = localStorage.getItem("accessToken");
        const data = dataForCreate();
        const path = "api/v1/businesses";
        const res = await createDataByPath(path, accessToken, data);
        if (res && res.status === 200) {
          successAlert("Create Company Successfully!");
          setTimeout(() => {
            history.push("/company");
          }, 2000);
        }
      } else {
        warningAlert("An error when create");
      }
    }
  }

  useEffect(() => {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      if (industriesList === null) {
        loadDataIndustry(accessToken);
      }
      if (semestersList === null) {
        loadDataSemester(accessToken);
      }
    }
  }, []);

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
                  history.push("/company");
                }}
              >
                <Apartment className="sidebarIcon" /> Company &gt;
              </a>
              <span className="text-default font-weight-bold">
                {" "}
                Create Company
              </span>
            </CardTitle>
            <span className="display-3">Create Company</span>
          </CardHeader>
          <CardBody>
            <Row className="mb-3">
              <Col md="12">
                <Row>
                  <Col md="6">
                    <div className="input-box mb-3">
                      <span className="details">ID</span>{" "}
                      <Input
                        className="text-defautl text-lg"
                        type="text"
                        value={companyID}
                        onChange={(e) => {
                          setCompanyID(e.target.value);
                        }}
                        placeholder="Enter ID Company"
                        required
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="input-box mb-3">
                      <span className="details">Company Name</span>{" "}
                      <Input
                        className="text-defautl text-lg"
                        type="text"
                        value={companyName}
                        onChange={(e) => {
                          setcompanyName(e.target.value);
                        }}
                        placeholder="Enter Company name"
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                    <div className="input-box mb-3">
                      <span className="details">Website</span>{" "}
                      <Input
                        className="text-defautl text-lg"
                        type="text"
                        value={companyWebsite}
                        onChange={(e) => {
                          setcompanyWebsite(e.target.value);
                        }}
                        placeholder="Enter Company Website"
                        required
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <div className="input-box mb-3">
                      <span className="details">Phone Contact</span>{" "}
                      <Input
                        className="text-defautl text-lg"
                        type="number"
                        value={contactPhone}
                        onChange={(e) => {
                          setContactPhone(e.target.value);
                        }}
                        placeholder="Enter Phone Contact"
                        required
                      />
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="input-box mb-3">
                      <span className="details">Email</span>{" "}
                      <Input
                        className="text-defautl text-lg"
                        type="email"
                        value={contactEmail}
                        onChange={(e) => {
                          setContactEmail(e.target.value);
                        }}
                        placeholder="Enter Company Email"
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <div className="input-box mb-3">
                      <span className="detail"> Semester</span>
                      {semestersList ? (
                        <Input
                          type="select"
                          style={{ fontSize: "20px" }}
                          value={semesters}
                          onChange={(e) => {
                            setSemesters(e.target.value);
                          }}
                        >
                          {semestersList.map((e) => {
                            return (
                              <option
                                key={`option${e.semesterId}`}
                                value={e.semesterId}
                              >
                                {e.semesterName}
                              </option>
                            );
                          })}
                        </Input>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="input-box mb-3">
                      <span className="detail"> Industry</span>
                      {industriesList ? (
                        <Input
                          className="text-defautl text-lg"
                          type="select"
                          style={{ fontSize: "20px" }}
                          value={industries}
                          onChange={(e) => {
                            setIndustries(e.target.value);
                          }}
                        >
                          {industriesList.map((e) => {
                            return (
                              <option
                                key={`option${e.industryId}`}
                                value={e.industryId}
                              >
                                {e.industryName}
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
                  onClick={() => createDataCompany()}
                >
                  Create Company
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
export default CreateCompany;
