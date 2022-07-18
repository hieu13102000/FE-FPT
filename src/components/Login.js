import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import { loginDataByPath } from "../service/data";
import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import jwtDecode from "jwt-decode";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
import AuthHeader from "./headers/LoginHeader";

const Login = () => {
  const [alert, setalert] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const { googleSignIn } = useUserAuth();

  const navigate = useHistory();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const responeGg = await googleSignIn();
      loginApi(responeGg.user.accessToken);
      // console.log("Thành công");
    } catch (error) {
      console.log(error.message);
    }
  };

  async function loginWithUsernamePassword(username, password) {
    if (username.trim() !== "" && password.trim() !== "") {
      const path = "api/v1/login/admin";
      const data = {
        id: username,
        password: password,
      };
      const res = await loginDataByPath(path, data);
      console.log(res);
      if (res && res.status === 200) {
        if (localStorage) {
          localStorage.setItem("accessToken", res.data);
          localStorage.setItem("roleID", jwtDecode(res.data).Roleid);
          const roleID = parseInt(jwtDecode(res.data).Roleid);
          successAlert("Login successfully");
          setTimeout(() => {
            if (roleID === 1) {
              navigate.push("/company");
            } else if (roleID === 3) {
              navigate.push("/createJob");
            }
          }, 2000);
        }
      } else if (res && res.status === 404) {
        warningAlert("Account is not belong in system");
      } else if (res && res.status === 400) {
        warningAlert("Username or password is Invalid");
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

  async function loginApi(accessToken) {
    console.log(accessToken);
    if (accessToken) {
      const path = `api/v1/login`;
      const data = { tokenfb: accessToken };
      const response = await loginDataByPath(path, data);
      // console.log(response);
      if (response && response.status === 200) {
        if (localStorage) {
          localStorage.setItem("accessToken", response.data);
          localStorage.setItem("roleID", jwtDecode(response.data).Roleid);
          localStorage.setItem("userID", jwtDecode(response.data).Userid);
          console.log("aaa", jwtDecode(response.data));
          const roleID = parseInt(jwtDecode(response.data).Roleid);
          successAlert("Login successfully");
          setTimeout(() => {
            if (roleID === 1) {
              navigate.push("/company");
            } else if (roleID === 3) {
              navigate.push("/createJob");
            }
          }, 2000);
        }
      } else if (response && response.status === 404) {
        warningAlert("Account is not belong in system");
      } else if (response && response.status === 400) {
        warningAlert("Username or password is Invalid");
      }
    }
  }

  useEffect(() => {
    ScrollReveal({ distance: "50px", reset: false, duration: 2000 });
    ScrollReveal().reveal(".login-form", { origin: "top" });
  }, []);

  return (
    <>
      {alert}
      <AuthHeader title="OJT" lead="Nền Tảng Hỗ Trợ Đăng Ký Thực Tập" />
      <Container className="mt--8 pb-5" fluid>
        <Row className="justify-content-center">
          <Col lg="4" md="7">
            <Card className="login-form bg-secondary border-0 mb-0">
              <CardHeader className="bg-transparent pb-5">
                <Row>
                  <Col lg="12" md="12" className="text-center">
                    <GoogleButton
                      className="g-btn"
                      type="dark"
                      onClick={handleGoogleSignIn}
                      style={{ margin: "auto" }}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <span>Đăng nhập với tài khoản</span>
                </div>
                <Form role="form">
                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Tài khoản"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Mật khẩu"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="info"
                      type="button"
                      onClick={() =>
                        loginWithUsernamePassword(username, password)
                      }
                    >
                      Đăng nhập
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
    </>
  );
};

export default Login;
