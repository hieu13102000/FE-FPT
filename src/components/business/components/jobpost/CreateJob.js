import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select,Breadcrumb} from 'antd';
import ReactBSAlert from "react-bootstrap-sweetalert";
import {
  createDataByPath,
  getDataByPathTest,
} from "../../../../service/data";
export default function CreateJob() {
  const [selectDepartment, setSelectDepartment] = useState([]);
  const [alert, setalert] = useState(false);
  useEffect(() => {
    loadListDepartment();
  }, []);
  //load List Department
  async function loadListDepartment() {
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const path = `api/v1/departments`;
      const res = await getDataByPathTest(path, accessToken, "");
      if (res !== null && res !== undefined && res.status === 200) {
        setSelectDepartment(res.data);
      }
    }
  }
  //createJobPosts
  async function createJobPosts(currentData) {
    if (localStorage && localStorage.getItem("accessToken") && localStorage.getItem("userID")) {
      const accessToken = localStorage.getItem("accessToken");
      const userID = localStorage.getItem("userID");
      const data = currentData;
      const path = `api/v1/job-post/${userID}`;
      const res = await createDataByPath(path, accessToken, data);
      if (res && res.status === 200) {
        successAlert('Job post created successfully');
      }
      else {
        errorsAlert('Job post creation failed');
      }
    }
  }

    /// altert messages
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
          timeout={1000}
        ></ReactBSAlert>
      );
    };
    const errorsAlert = (message) => {
      setalert(
        <ReactBSAlert
          error
          style={{ display: "block", marginTop: "-100px" }}
          title={message}
          onConfirm={() => setalert(null)}
          onCancel={() => setalert(null)}
          showConfirm={false}
          showCancel={false}
          confirmBtnBsStyle="error"
          confirmBtnText="Ok"
          btnSize=""
          timeout={1000}
        ></ReactBSAlert>
      );
    };
    

  const { Option } = Select;

  const [form] = Form.useForm();
  const submitForm = (values) => {
    console.log('Success:', values);
    createJobPosts(values)
    form.resetFields();
  };
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
    <Breadcrumb.Item>Home</Breadcrumb.Item>
    <Breadcrumb.Item>
      <a href="">Create job</a>
    </Breadcrumb.Item>
  </Breadcrumb>
       {alert}
       <div  style={{backgroundColor: 'white',height: "inherit"}}>
       <Form
        form={form}
        onFinish={submitForm}
      >
        <div className="row ml-5">
          <div className="col-12 col-md-12 text-center m-4">
            <h1>Create job</h1>
          </div>
          <div className="col-12 col-md-6 row">
            <div className="col-4">
              <span>Job Name</span>
            </div>
            <div className="col-8">
              <Form.Item
                name="jobName"
                rules={[{ required: true, message: 'Please input your jobName!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-4">
              <span>Detail Work</span>
            </div>
            <div className="col-8">
              <Form.Item
                name="detailWork"
                rules={[{ required: true, message: 'Please input your detailWork!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-4">
              <span>Request</span>
            </div>
            <div className="col-8">
              <Form.Item
                name="request"
                rules={[{ required: true, message: 'Please input your request!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-4">
              <span>Salary</span>
            </div>
            <div className="col-8">
              <Form.Item
                name="salary"
                rules={[{ required: true, message: 'Please input your salary!' }]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className="col-12 col-md-6 row">
            <div className="col-4">
              <span>Work Location</span>
            </div>
            <div className="col-8">
              <Form.Item
                name="workLocation"
                rules={[{ required: true, message: 'Please input your workLocation!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-4">
              <span>Detail Business</span>
            </div>
            <div className="col-8">
              <Form.Item
                name="detailBusiness"
                rules={[{ required: true, message: 'Please input your detailBusiness!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-4">
              <span>Benefit</span>
            </div>
            <div className="col-8">
              <Form.Item
                name="benefit"
                rules={[{ required: true, message: 'Please input your benefit!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-4">
              <span>Amount</span>
            </div>
            <div className="col-8">
              <Form.Item
                name="amount"
                rules={[{ required: true, message: 'Please input your amount!' }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-4">
              <span>List Department</span>
            </div>
            <div className="col-8">
              <Form.Item
                name="listDepartment"
                rules={[{ required: true, message: 'Please select your list department!', type: 'array' }]}
              >
                  <Select mode="multiple"  allowClear placeholder="Please select list department">
                  {selectDepartment.map(a =>
                        <Option key={a.departmentId} value={a.departmentId}>{a.departmentName}</Option>
                    )}
                  </Select>
              </Form.Item>
            </div>
          </div>
          <div className="col-12 col-md-12 text-right">
            <Button style={{ width: '200px', height: "50px",marginRight: '50px' }} type="primary" htmlType="submit">Create</Button>
          </div>
        </div>
      </Form>
       </div>
    </>
  )
}
