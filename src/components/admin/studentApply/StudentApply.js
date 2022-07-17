import React, { useEffect } from "react";
import { getDataByPathTest } from "../../../service/data";
import { useState } from "react";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import { convertDateToShowWithTime } from "../../../service/formatData";
import ApplyDetail from "./components/ApplyDetail";
function StudentApply() {
  const [stuApply, setStuApply] = useState(null);
  const [detailModal, setDetailModal] = useState(false);
  const [applyDetail, setApplyDetail] = useState(null);

  async function loadDataStudentApply(accessToken) {
    const path = `api/v1/applys`;
    const res = await getDataByPathTest(path, accessToken, "");
    if (res !== null && res !== undefined && res.status === 200) {
      setStuApply(res.data);
    }
  }

  async function loadDataApplyDetail(studentID, studentName, businessName) {
    if (studentID) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `api/v1/applys/${studentID}`;
      const res = await getDataByPathTest(path, accessToken, "");
      console.log(res);
      if (res !== null && res !== undefined && res.status === 200) {
        const data = {
          ...res.data,
          studentName: studentName,
          businessName: businessName,
        };
        setApplyDetail(data);
        setDetailModal(true);
      }
    }
  }

  const handleViewDetail = (studentID, studentName, businessName) => {
    setApplyDetail(null);
    if (studentID) {
      loadDataApplyDetail(studentID, studentName, businessName);
    }
  };

  useEffect(() => {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      loadDataStudentApply(accessToken);
    }
  }, []);
  return (
    <>
      <Topbar />
      <Sidebar />
      <Container className="mt-3">
        <Card>
          <CardHeader>
            <Row className="mb-3">
              <Col lg="12" md="12">
                <h3 className="display-3">Student Apply List</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th className="table-plus datatable-nosort">No</th>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Email</th>
                  <th>Business Name</th>
                  <th>ApplyDate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stuApply ? (
                  stuApply.map((e, value) => {
                    return (
                      <tr key={value}>
                        <td>{value + 1}</td>
                        <td>{e.studentId}</td>
                        <td>{e.studentName}</td>
                        <td>{e.email} </td>
                        <td>{e.businessName}</td>
                        <td>{convertDateToShowWithTime(e.applyDate)}</td>
                        <td>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-default"
                              color=""
                              role="button"
                              size="sm"
                            >
                              <i className="fas fa-caret-down"></i>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                href="#view"
                                onClick={(ele) => {
                                  ele.preventDefault();
                                  handleViewDetail(
                                    e.studentId,
                                    e.studentName,
                                    e.businessName
                                  );
                                }}
                              >
                                <i className="fas fa-edit"></i> View Apply
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
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
      <Modal
        className="modal-dialog-centered"
        size="lg"
        isOpen={detailModal}
        toggle={() => setDetailModal(false)}
      >
        <div className="modal-body p-0">
          <ApplyDetail data={applyDetail} setDetailModal={setDetailModal} />
        </div>
      </Modal>
    </>
  );
}
export default StudentApply;
