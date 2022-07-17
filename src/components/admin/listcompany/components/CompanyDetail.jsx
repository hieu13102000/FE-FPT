import React from "react";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";

export default function CompanyDetail(props) {
  return (
    <>
      <Card className="bg-secondary border-0 mb-0" lg="9">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-center">
            <h3>Company Detail:</h3>
          </div>
        </CardHeader>
        {props.data ? (
          <CardBody className="px-lg-5 py-lg-5">
            <Row className="mb-4 align-items-center justify-content-center">
              <Col lg="8" md="8">
                <h3 className="mb-1">
                  Company ID:{" "}
                  <span className="text-gray">{props.data.businessId}</span>
                </h3>
                <h3 className="mb-1">
                  Company Name: {props.data.businessName}
                </h3>
                <h3 className="mb-1">
                  Website:{" "}
                  <a
                    className="text-info text-underline"
                    href={
                      props.data.website.includes("http")
                        ? props.data.website
                        : `https://${props.data.website}`
                    }
                    target={"_blank"}
                  >
                    {props.data.website}
                  </a>
                </h3>
                <h3 className="mb-1">
                  Contact Phone: {props.data.contactPhone}
                </h3>
                <h3 className="mb-1">
                  Contact Email: {props.data.contactEmail}
                </h3>
                <h3 className="mb-1">Industry ID: {props.data.industryId}</h3>
                <h3 className="mb-1">Semester ID: {props.data.semesterId}</h3>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col className="text-center" lg="6" md="12">
                <Button
                  color="warning"
                  outline
                  onClick={() => {
                    props.handleDeleteDataBussiness(props.data.businessId);
                  }}
                >
                  <i className="fas fa-trash mr-2" />
                  Remove Company
                </Button>
              </Col>
              <Col className="text-center" lg="6" md="12">
                <Button
                  color="info"
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
