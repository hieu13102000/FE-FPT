import React, { useState, useEffect,useRef } from "react";
import { Modal, Form, Input, Breadcrumb } from 'antd';
import { isWebUri } from 'valid-url';
import { getDataByPathTest, updateDataByPath } from "../../../../service/data";
import ChangeAvatar from "./changeAvatar"




let currentURL =""
function callbackFunction (urlImg) {
  currentURL = urlImg
  console.log("Current URL: " + currentURL);
}


export default function detailBusinesses() {
  console.log("con guiw data",currentURL);
  const childRef = useRef(null);
 
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    getDetailBusinesses();
  }, []);
  //load getDetailBusinesses
  async function getDetailBusinesses() {
    if (localStorage && localStorage.getItem("accessToken") && localStorage.getItem("userID")) {
      const accessToken = localStorage.getItem("accessToken");
      const userID = localStorage.getItem("userID");
      const path = `api/v1/businesses/${userID}`;
      const res = await getDataByPathTest(path, accessToken, "");
      if (res !== null && res !== undefined && res.status === 200) {
        setData(res.data)
      }
    }
  }

  // update DetailBusinesses
  async function updateDetail(currentData) {
    if (localStorage && localStorage.getItem("accessToken") && localStorage.getItem("userID")) {
      const accessToken = localStorage.getItem("accessToken");
      const userID = localStorage.getItem("userID");
      const data = currentData;
      const path = `api/v1/businesses/${userID}`;
      const res = await updateDataByPath(path, accessToken, data);
      if (res && res.status === 200) {
        alert("thanh cong")
      }
      else {
        alert("that bai")
      }
    }
  }


  const onCreate = (valuesForm) => {
    childRef.current.handleUpload();
    const currentData = valuesForm
    if (currentURL !== data.image){
      currentData.image=currentURL
    }
    else {
      currentData.image=data.image
    }
    console.log('Received values of form: ', currentData);
    updateDetail(currentData)
    setVisible(false);
  };
  // form edit DetailBusinesses
  const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Edit details"
        okText="Update"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values);
              form.resetFields();
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        width={1000}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
          <div className="row">
            <div className="col-12 col-md-6 row">
              <ChangeAvatar parentCallback={callbackFunction} preUrl={data.image} ref={childRef}/>
            </div>
            <div className="col-12 col-md-6 row">
              <div className="col-4">
                <span>Business ID</span>
              </div>
              <div className="col-8">
                <Form.Item
                  name="businessId"
                  rules={[{ required: true, message: 'Please input your businessID!' }]}
                  initialValue={data.businessId}
                >
                  <Input disabled={true} />
                </Form.Item>
              </div>
              <div className="col-4">
                <span>Name</span>
              </div>
              <div className="col-8">
                <Form.Item
                  name="businessName"
                  rules={[{ required: true, message: 'Please input your Name!' }]}
                  initialValue={data.businessName}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="col-4">
                <span>Website</span>
              </div>
              <div className="col-8">
                <Form.Item
                  name="website"
                  initialValue={data.website}
                  rules={[{ required: true, message: 'Please input your website!' }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="col-4">
                <span>Phone</span>
              </div>
              <div className="col-8">
                <Form.Item
                  name="contactPhone"
                  initialValue={data.contactPhone}
                  rules={[{ required: true, message: 'Please input your Phone!' }]}
                >
                  <Input />
                </Form.Item>
              </div>
              <div className="col-4">
                <span>Email</span>
              </div>
              <div className="col-8">
                <Form.Item
                  name="contactEmail"
                  initialValue={data.contactEmail}
                  rules={[{ required: true, message: 'Please input your Email!' }]}
                >
                  <Input />
                </Form.Item>

              </div>
            </div>
          </div>
        </Form>
      </Modal >
    );
  };

  return (
    <>
        <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="#">List apply</a>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ backgroundColor: 'white', height: "inherit" }} className="row">
        <div className="col-12 col-md-4">
          <div className="profile-img mt-5">
            {isWebUri(data.image)? <img style={{ height: '284px', width: '264px' }} src={data.image} alt="" /> : <img style={{ height: '284px', width: '264px' }}  src="https://image.shutterstock.com/image-vector/man-icon-profile-member-user-260nw-1335068444.jpg" alt="" />}
          </div>
        </div>
        <div className="col-12 col-md-8">
          <div className="row">
            <div className="col-10 mb-3 mt-5 text-center align-self-center">
              <h1>Profile</h1>
            </div>
            <div className="col-2 text-right mb-3 mt-5">
              <button type="button" className="btn btn-secondary" onClick={() => { setVisible(true) }}>Edit</button>
            </div>

            <div className="col-2">
              <h4>Id :</h4>
            </div>
            <div className="col-10">
              <span>{data.businessId}</span>
            </div>

            <div className="col-2">
              <h4>Name :</h4>
            </div>
            <div className="col-10">
              <span>{data.businessName}</span>
            </div>

            <div className="col-2">
              <h4>Website :</h4>
            </div>
            <div className="col-10">
              <span>{data.website}</span>
            </div>

            <div className="col-2">
              <h4>Phone :</h4>
            </div>
            <div className="col-10">
              <span>{data.contactPhone}</span>
            </div>

            <div className="col-2">
              <h4>Email :</h4>
            </div>
            <div className="col-10">
              <span>{data.contactEmail}</span>
            </div>

            <div className="col-2">
              <h4>Industry Id :</h4>
            </div>
            <div className="col-10">
              <span>{data.industryId}</span>
            </div>

            <div className="col-2">
              <h4>Semester Id :</h4>
            </div>
            <div className="col-10">
              <span>{data.semesterId}</span>
            </div>
          </div>
        </div>

        <CollectionCreateForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }} />

      </div>
    </>
  )
}
