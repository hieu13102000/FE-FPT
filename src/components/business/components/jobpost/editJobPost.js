import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, message, } from 'antd';
import 'antd/dist/antd.css';
import {
  updateDataByPath,
  getDataByPathTest,
  deleteDataByPath,
} from "../../../../service/data";

export default function editJobPost(props) {
  const [selectDepartment, setSelectDepartment] = useState([]);

  // console.log("Enter",props.payLoad);
  function sendData() {
    props.change(false);
  }

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
  // convert the jobDepartments object to an array with departmentIds
  let arrayDepartment=[];
  props.payLoad.jobDepartments.map(value => {
    arrayDepartment.push(value.departmentId)
  })

  //update JobPosts
  async function updateJobPosts(currentData) {
    if (localStorage && localStorage.getItem("accessToken") && localStorage.getItem("userID")) {
      const accessToken = localStorage.getItem("accessToken");
      const userID = localStorage.getItem("userID");
      const data = currentData;
      data.businessID=userID
      const path = `api/v1/job-post/${props.payLoad.jobPositionId}`;
      const res = await updateDataByPath(path, accessToken, data);
      if (res && res.status === 200) {
        jopPostSuccess()
      }
      else {
        jopPostError()
      }
      sendData()
    }
  }

  async function deleteJobPosts(currentData) {
    if (localStorage && localStorage.getItem("accessToken") && localStorage.getItem("userID")) {
      const accessToken = localStorage.getItem("accessToken");
      const userID = localStorage.getItem("userID");
      const data = currentData;
      console.log("120px",data);
      const path = `api/v1/job-post/${data}`;
      const res = await deleteDataByPath(path, accessToken, "");
      if (res && res.status === 200) {
        deleteSuccess()
      }
      else {
        deleteError()
      }
      sendData()
    }
  }
  
  const deleteJob = () => {
    deleteJobPosts(props.payLoad.jobPositionId)
  }

  //Message
  function jopPostSuccess() {
    message.success('Job post updated successfully');
  };
  function jopPostError() {
    message.error('Job post updated failed');
  };

  function deleteSuccess() {
    message.success('Job post deleted successfully');
  };
  function deleteError() {
    message.error('Job post deleted failed');
  };

  const { Option } = Select;

  const [form] = Form.useForm();
  const submitForm = (values) => {
    values.jobPositionId = props.payLoad.jobPositionId
    console.log('Success:', values);
    updateJobPosts(values)
  };
  return (
    <div style={{ backgroundColor: 'white', height: "inherit" }}>
      <Form
        form={form}
        onFinish={submitForm}
      >
        <div className="row">
          <div className="col-12 col-md-12 text-center my-4">
            <h1>Update Job</h1>
          </div>
          <div className="col-12 col-md-6 ml-4 row">
            <div className="col-4">
              <span>Job Name</span>
            </div>
            <div className="col-8">
              <Form.Item
                name="jobName"
                initialValue={props.payLoad.jobName}
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
                initialValue={props.payLoad.detailWork}
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
                initialValue={props.payLoad.request}
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
                initialValue={props.payLoad.salary}
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
                initialValue={props.payLoad.workLocation}
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
                initialValue={props.payLoad.detailBusiness}
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
                initialValue={props.payLoad.benefit}
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
                initialValue={props.payLoad.amount}
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
                <Select mode="multiple" allowClear
                 defaultValue={arrayDepartment}
                 placeholder="Please select list department">
                  {selectDepartment.map(a =>
                    <Option key={a.departmentId} value={a.departmentId}>{a.departmentName}</Option>
                  )}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="col-12 col-md-12 text-right mt-4 mr-5">
            <Button type="primary" htmlType="submit">Update</Button>
            <Button type="primary" danger className="mx-3" onClick={deleteJob} >Delete</Button>
          </div>
        </div>
      </Form>
    </div>
  )
}
