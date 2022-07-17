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

export default function CreateIndustry(props) {
  const [industryID, setIndustryID] = useState("");
  const [industryName, setIndustryName] = useState("");
  return (
    <>
      <Card className="bg-secondary border-0 mb-0" lg="9">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-center">
            <h3>Create New Industry</h3>
          </div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <Row className="mb-4 align-items-center justify-content-center">
            <Col lg="8" md="8">
              <span className="mb-3">Industry ID: </span>
              <Input
                className="text-default text-lg mb-3"
                defaultValue={industryID}
                placeholder="Input Department ID"
                type="text"
                onChange={(e) => {
                  setIndustryID(e.target.value);
                }}
              />
              <span className="mb-1">Industry Name:</span>
              <Input
                className="text-default text-lg"
                defaultValue={industryName}
                placeholder="Input Department Name"
                type="text"
                onChange={(e) => {
                  setIndustryName(e.target.value);
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
                  props.createDataIndustry(industryID, industryName);
                }}
              >
                Create Industry
              </Button>
            </Col>
            <Col className="text-center" lg="6" md="12">
              <Button
                color="info"
                onClick={() => {
                  props.setcreateIndustryModal(false);
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
