import React, { useEffect } from "react";
import { deleteDataByPath, getDataByPathTest } from "../../../service/data";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import CompanyDetail from "./components/CompanyDetail";

function Listcompany() {
  const [business, setBusiness] = useState(null);
  const [detailModal, setDetailModal] = useState(false);
  const [companyDetail, setCompanyDetail] = useState(null);
  const [alert, setalert] = useState(false);
  const history = useHistory();
  useEffect(() => {
    if (localStorage && localStorage.getItem("accessToken")) {
      if (business === null) loadDataBussiness();
    }
  }, []);

  async function loadDataBussiness() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `api/v1/businesses`;
      const res = await getDataByPathTest(path, accessToken, "");
      if (res !== null && res !== undefined && res.status === 200) {
        setBusiness(res.data);
      }
    }
  }

  const deleteAlert = (message, id) => {
    setalert(
      <ReactBSAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title={message}
        onConfirm={() => deleteDataBusiness(id)}
        onCancel={() => setalert(null)}
        showCancel={true}
        showConfirm={true}
        confirmBtnBsStyle="warning"
        confirmBtnText="Yes"
        cancelBtnBsStyle="default"
        cancelBtnText="Cancel"
        btnSize=""
      ></ReactBSAlert>
    );
  };

  async function loadDataBussinessDetail(id) {
    if (id) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `api/v1/businesses/${id}`;
      const res = await getDataByPathTest(path, accessToken, "");
      console.log(res);
      if (res !== null && res !== undefined && res.status === 200) {
        setCompanyDetail(res.data);
        setDetailModal(true);
      }
    }
  }

  const handleViewDetail = (id) => {
    setCompanyDetail(null);
    if (id) {
      loadDataBussinessDetail(id);
    }
  };

  const handleDeleteDataBussiness = (id) => {
    if (id) {
      deleteAlert("Are you sure to remove this company ?", id);
    }
  };

  async function deleteDataBusiness(id) {
    if (id && localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `api/v1/businesses`;
      const res = await deleteDataByPath(path, accessToken, id);
      console.log(res);
      if (res !== null && res !== undefined && res.status === 200) {
        loadDataBussiness();
        setCompanyDetail(null);
        setalert(null);
        setDetailModal(false);
      }
    }
  }

  async function searchDataBussiness(id) {
    const path = `api/v1/businesses/Search`;
    let data = `name=${id}`;
    if (id === "") {
      data = "";
    }
    const res = await getDataByPathTest(path, "", data);
    if (res && res.status === 200) {
      setBusiness(res.data);
    }
  }

  // const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  function handleSearchTermChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    // if (!onSubmit) return;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      searchDataBussiness(value);
    }, 300);
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
                <h3 className="display-3">Company List</h3>
              </Col>
              <Col className="text-right" lg="6" md="12">
                <Button
                  onClick={() => history.push("company/create")}
                  color="info"
                >
                  Create Company
                </Button>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col lg="4" md="12">
                <InputGroup>
                  <Input
                    className="text-default"
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    placeholder="Type to search"
                    style={{
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                    }}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText
                      style={{
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px",
                      }}
                    >
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr>
                  <th className="table-plus datatable-nosort">No</th>
                  <th>Business ID</th>
                  <th>Name</th>
                  <th>Industry ID</th>
                  <th>Semester ID</th>
                  <th className="datatable-nosort">Action</th>
                </tr>
              </thead>
              <tbody>
                {business ? (
                  business.map((e, value) => {
                    return (
                      <tr key={`company-${value}`}>
                        <td className="table-plus">{value + 1}</td>
                        <td>{e.businessId}</td>
                        <td>{e.businessName}</td>
                        <td>{e.industryId}</td>
                        <td>{e.semesterId}</td>
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
                                  handleViewDetail(e.businessId);
                                }}
                              >
                                <i className="fas fa-edit"></i> View Company
                              </DropdownItem>
                              <DropdownItem
                                href="#view"
                                onClick={(ele) => {
                                  ele.preventDefault();
                                  handleDeleteDataBussiness(e.businessId);
                                }}
                              >
                                <i className="fas fa-trash"></i> Remove Company
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
          <CompanyDetail
            data={companyDetail}
            setDetailModal={setDetailModal}
            handleDeleteDataBussiness={handleDeleteDataBussiness}
          />
        </div>
      </Modal>
    </>
  );
}
export default Listcompany;
