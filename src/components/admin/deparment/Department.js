import React, { useEffect } from "react";
import { createDataByPath, getDataByPathTest } from "../../../service/data";
import { useState } from "react";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
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
import CreateDepartment from "./components/CreateDepartment";
import ReactBSAlert from "react-bootstrap-sweetalert";

function Department() {
  const [department, setDepartment] = useState(null);
  const [createDepartmentModal, setCreateDepartmentModal] = useState(false);
  const [alert, setalert] = useState(false);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (department === null) {
      loadDataDepartment(accessToken);
    }
  }, []);

  async function loadDataDepartment(accessToken) {
    const path = `api/v1/departments`;
    const res = await getDataByPathTest(path, accessToken, "");
    console.log(res);
    if (res !== null && res !== undefined && res.status === 200) {
      setDepartment(res.data);
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
      warningAlert("Department ID must not empty!");
      return false;
    } else if (name.trim() === "") {
      warningAlert("Department Name must not empty!");
      return false;
    }
    return true;
  };

  const dataForCreate = (id, name) => {
    return {
      id: id,
      name: name,
    };
  };

  async function createDataDepartment(id, name) {
    if (localStorage && localStorage.getItem("accessToken")) {
      if (checkValidation(id, name)) {
        const accessToken = localStorage.getItem("accessToken");
        const data = dataForCreate(id, name);
        const path = "api/v1/departments";
        const res = await createDataByPath(path, accessToken, data);
        console.log(res);
        if (res && res.status === 200) {
          successAlert("Create Department Successfully!");
          loadDataDepartment(accessToken);
          setCreateDepartmentModal(false);
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
                <h3 className="display-3">Department List</h3>
              </Col>
              <Col className="text-right" lg="6" md="12">
                <Button
                  color="info"
                  onClick={() => setCreateDepartmentModal(true)}
                >
                  Create Department
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th className="table-plus datatable-nosort">No</th>
                  <th>Department ID</th>
                  <th>Department Name</th>
                </tr>
              </thead>
              <tbody>
                {department ? (
                  department.map((e, value) => {
                    return (
                      <tr key={value}>
                        <td className="table-plus">{value + 1}</td>
                        <td>{e.departmentId}</td>
                        <td>{e.departmentName}</td>
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
        isOpen={createDepartmentModal}
        toggle={() => setCreateDepartmentModal(false)}
      >
        <div className="modal-body p-0">
          <CreateDepartment
            createDataDepartment={createDataDepartment}
            setCreateDepartmentModal={setCreateDepartmentModal}
          />
        </div>
      </Modal>
    </>
  );
}
export default Department;
