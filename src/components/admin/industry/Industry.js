import React, { useEffect } from "react";
import { createDataByPath, getDataByPathTest } from "../../../service/data";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Modal,
  Row,
  Table,
} from "reactstrap";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import ReactBSAlert from "react-bootstrap-sweetalert";
import CreateIndustry from "./components/CreateIndustry";

function Industry(props) {
  const [industries, setIndustries] = useState(null);
  const [createIndustryModal, setcreateIndustryModal] = useState(false);
  const [alert, setalert] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (industries === null) {
      loadDataIndustry(accessToken);
    }
  }, []);

  async function loadDataIndustry(accessToken) {
    const path = `api/v1/industries`;
    const res = await getDataByPathTest(path, accessToken, "");
    console.log(res);
    if (res !== null && res !== undefined && res.status === 200) {
      setIndustries(res.data);
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
        showConfirm={true}
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

  const checkValidation = (id, name) => {
    if (id.trim() === "") {
      warningAlert("Industry ID must not empty!");
      return false;
    } else if (name.trim() === "") {
      warningAlert("Industry Name must not empty!");
      return false;
    }
    return true;
  };

  const dataForCreate = (id, name) => {
    return {
      industryId: id,
      industryName: name,
    };
  };

  async function createDataIndustry(id, name) {
    if (localStorage && localStorage.getItem("accessToken")) {
      if (checkValidation(id, name)) {
        const accessToken = localStorage.getItem("accessToken");
        const data = dataForCreate(id, name);
        const path = "api/v1/industries";
        const res = await createDataByPath(path, accessToken, data);
        console.log(res);
        if (res && res.status === 200) {
          successAlert("Create Industry Successfully!");
          loadDataIndustry(accessToken);
          setcreateIndustryModal(false);
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
            <Row className="mb-3">
              <Col lg="6" md="12">
                <h3 className="display-3">Industry List</h3>
              </Col>
              <Col className="text-right" lg="6" md="12">
                <Button
                  color="info"
                  onClick={() => setcreateIndustryModal(true)}
                >
                  Create Industry
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th className="table-plus datatable-nosort">No</th>
                  <th>Industry Id</th>
                  <th>Industry Name</th>
                </tr>
              </thead>
              <tbody>
                {industries ? (
                  industries.map((e, value) => {
                    return (
                      <tr key={value}>
                        <td className="table-plus">{value + 1}</td>
                        <td>{e.industryId}</td>
                        <td>{e.industryName}</td>
                      </tr>
                    );
                  })
                ) : (
                  <></>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Container>
      <Modal
        className="modal-dialog-centered"
        size="md"
        isOpen={createIndustryModal}
        toggle={() => setcreateIndustryModal(false)}
      >
        <div className="modal-body p-0">
          <CreateIndustry
            createDataIndustry={createDataIndustry}
            setcreateIndustryModal={setcreateIndustryModal}
          />
        </div>
      </Modal>
    </>
  );
}
export default Industry;
