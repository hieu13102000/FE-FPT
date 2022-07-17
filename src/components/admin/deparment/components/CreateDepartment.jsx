import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Row,
} from "reactstrap";

export default function CreateDepartment(props) {
  const [departmentID, setDepartmentID] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  return (
    <>
      <Card className="bg-secondary border-0 mb-0" lg="9">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-center">
            <h3>Create New Department</h3>
          </div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <Row className="mb-4 align-items-center justify-content-center">
            <Col lg="8" md="8">
              <span className="mb-3">Department ID: </span>
              <Input
                className="text-default text-lg mb-3"
                defaultValue={departmentID}
                placeholder="Input Department ID"
                type="text"
                onChange={(e) => {
                  setDepartmentID(e.target.value);
                }}
              />
              <span className="mb-1">Deparment Name:</span>
              <Input
                className="text-default text-lg"
                defaultValue={departmentName}
                placeholder="Input Department Name"
                type="text"
                onChange={(e) => {
                  setDepartmentName(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col className="text-center" lg="6" md="12">
              <Button
                color="success"
                outline
                onClick={() => {
                  props.createDataDepartment(departmentID, departmentName);
                }}
              >
                Create Department
              </Button>
            </Col>
            <Col className="text-center" lg="6" md="12">
              <Button
                color="info"
                onClick={() => {
                  props.setCreateDepartmentModal(false);
                }}
              >
                Đóng
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}
