import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Badge,
} from "reactstrap";
import { convertDateToShowWithTime } from "../../../../service/formatData";

export default function ApplyDetail(props) {
  return (
    <>
      <Card className="bg-secondary border-0 mb-0" lg="9">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-center">
            <h3>Thông tin chi tiết:</h3>
          </div>
        </CardHeader>
        {props.data ? (
          <CardBody className="px-lg-5 py-lg-5">
            <Row className="mb-4 align-items-center justify-content-center">
              <Col lg="8" md="8">
                <h3 className="mb-1">
                  Student ID:{" "}
                  <span className="text-gray">{props.data.studentId}</span>
                </h3>
                <h3 className="mb-1">Student ID: {props.data.studentName}</h3>
                <h3 className="mb-1">
                  Apply Date: {convertDateToShowWithTime(props.data.applyDate)}
                </h3>
                <h3 className="mb-1">
                  Bussiness ID:{" "}
                  <span className="text-gray">{props.data.businessId}</span>
                </h3>
                <h3 className="mb-1">
                  Bussiness Name: {props.data.businessName}
                </h3>
                <h3 className="mb-1">
                  CV:{" "}
                  <a
                    className="text-info text-underline"
                    href={
                      props.data.cv.includes("http")
                        ? props.data.cv
                        : `https://${props.data.cv}`
                    }
                    target={"_blank"}
                  >
                    {props.data.cv}
                  </a>
                </h3>
                <h3 className="mb-1">
                  Status:{" "}
                  <Badge
                    pill
                    color={
                      props.data.statusApply === 1
                        ? "info"
                        : props.data.statusApply === 2
                        ? "success"
                        : "danger"
                    }
                  >
                    {props.data.statusApply === 1
                      ? "Pending"
                      : props.data.statusApply === 2
                      ? "Aprove"
                      : "Fail"}
                  </Badge>
                </h3>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col className="text-center" lg="12" md="12">
                <Button
                  color="warning"
                  onClick={() => {
                    props.setDetailModal(false);
                  }}
                >
                  Đóng
                </Button>
              </Col>
            </Row>
          </CardBody>
        ) : (
          <></>
        )}
      </Card>
    </>
  );
}
