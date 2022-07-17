import React, { useEffect } from "react";
import { getDataByPathTest } from "../../../service/data";
import { useState } from "react";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import { convertDateToShowWithTime } from "../../../service/formatData";
import { useHistory } from "react-router-dom";

function Semester(props) {
  const [semesters, setSemester] = useState(null);
  const history = useHistory();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (semesters === null) {
      loadDataSemester(accessToken);
    }
  }, []);

  async function loadDataSemester(accessToken) {
    const path = `api/v1/semesters`;
    const res = await getDataByPathTest(path, accessToken, "");
    console.log(res);
    if (res !== null && res !== undefined && res.status === 200) {
      setSemester(res.data);
    }
  }
  return (
    <>
      <Topbar />
      <Sidebar />
      <Container className="mt-3">
        <Card>
          <CardHeader>
            <Row className="mb-3 mt-3">
              <Col lg="6" md="12">
                <h3 className="display-3">Semester List</h3>
              </Col>
              <Col className="text-right" lg="6" md="12">
                <Button
                  color="info"
                  onClick={() => {
                    history.push("semester/create");
                  }}
                >
                  Create Sememster
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th className="table-plus datatable-nosort">No</th>
                  <th>SemesterID</th>
                  <th>Semester Name</th>
                  <th>StartDate</th>
                  <th>EndDate</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {semesters ? (
                  semesters.map((e, value) => {
                    return (
                      <tr key={value}>
                        <td className="table-plus">{value + 1}</td>
                        <td>{e.semesterId}</td>
                        <td>{e.semesterName}</td>
                        <td>{convertDateToShowWithTime(e.startDate)} </td>
                        <td>{convertDateToShowWithTime(e.endDate)}</td>
                        <td>
                          <div className="color-box">
                            <Badge
                              className="font-weight-bold"
                              pill
                              color={
                                e.statusId === "On going"
                                  ? "success"
                                  : e.statusId === "Future"
                                  ? "info"
                                  : "danger"
                              }
                            >
                              {e.statusId}
                            </Badge>
                          </div>
                        </td>
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
    </>
  );
}
export default Semester;
