import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, message, } from 'antd';
import 'antd/dist/antd.css';
import {
  createDataByPath,
  getDataByPathTest,
} from "../../../../service/data";
export default function CreateJob() {
  const [selectDepartment, setSelectDepartment] = useState([]);
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
    if (localStorage && localStorage.getItem("accessToken")) {
      const accessToken = localStorage.getItem("accessToken");
      const data = currentData;
      const path = "api/v1/job-post";
      const res = await createDataByPath(path, accessToken, data);
      if (res && res.status === 200) {
        jopPostSuccess()
      }
      else {
        jopPostError()
      }
    }
  }

  //Message
  function jopPostSuccess() {
    message.success('Job post created successfully');
  };
  function jopPostError() {
    message.error('Job post creation failed');
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
      <Form
        form={form}
        onFinish={submitForm}
      >
        <div className="row">
          <div className="col-12 col-md-12 text-center mb-4">
            <h1>Create job</h1>
          </div>
          <div className="col-12 col-md-6 row">
            <div className="col-4">
              <span>ID</span>
            </div>
            <div className="col-8">
              <Form.Item
                name="businessID"
                rules={[{ required: true, message: 'Please input your businessID!' }]}
              >
                <Input />
              </Form.Item>
            </div>
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
          <div className="col-12 col-md-12 text-right mt-4 mr-5">
            <Button style={{ width: '200px', height: "50px" }} type="primary" htmlType="submit">Create</Button>
          </div>
        </div>
      </Form>
    </>
  )
}
