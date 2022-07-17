import React, { useState, useEffect } from "react";
import { Table, Tag, Button, Modal,message } from 'antd';
import moment from "moment";
import { getDataByPathTest , updateDataByPath } from "../../../../service/data";

export default function ListApplyJobPost() {
  const [dataTabe, setDataTable] = useState([]);
  const [currentDataID, setCurrentDataID] = useState({});
  const [currentStatus, setCurrentStatus] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);


    //load List Department
    async function listApplyJobPost() {
      if (localStorage && localStorage.getItem("accessToken") && localStorage.getItem("userID")) {
        const accessToken = localStorage.getItem("accessToken");
        const userID = localStorage.getItem("userID");
        const path = `api/v1/applys/business/${userID}`;
        const res = await getDataByPathTest(path, accessToken, "");
        if (res !== null && res !== undefined && res.status === 200) {
          setDataTable(res.data)
        }
      }
    }
  // edit status Apply
    async function updateStatusApply(applyId, currentStatus) {
      if (localStorage && localStorage.getItem("accessToken")) {
        const accessToken = localStorage.getItem("accessToken");
        const path = `api/v1/applys/${applyId}/status`;
        const res = await updateDataByPath(path, accessToken, currentStatus);
        if (res !== null && res !== undefined && res.status === 200) {
          message.success('Update status success');
        }
        else {
          message.error('Update status error');
        }
      }
    }
    
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };
 
  const handleUpdateStatus= (data,query) => {
    if(query==="approve"){
      const temporaryVariable = {
        id: data.applyId,
        status:2
      }
      updateStatusApply(data.applyId,temporaryVariable)
    }
    else if(query==="reject"){
      const temporaryVariable = {
        id: data.applyId,
        status:3
      }
      updateStatusApply(data.applyId,temporaryVariable)
    }
    setIsModalVisible(false);
  }
  const handleGetID = (data) => {
    setCurrentDataID(data)
    setCurrentStatus(data)
    console.log("showModal",data);
    showModal();
  }
  useEffect(() => {
    listApplyJobPost();
  }, []);

  const columns = [
    {
      title: 'Id',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Apply date',
      dataIndex: 'applyDate',
      key: 'applyDate',
      render: (dom) => {
        return <span>{moment(dom).format('DD/MM/YYYY')}</span>;
      }
    },
    {
      title: 'Status apply',
      key: 'statusApply',
      dataIndex: 'statusApply',
      render: (_, { statusApply }) => (
        <>
          {String(statusApply).split("").map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';

            if (tag === '1') {
              color = '#1890ff';
              tag = 'pending';
            }
            else if (tag === '2') {
              color = '#73d13d';
              tag = 'approve';
            }
            else if (tag === '3') {
              color = 'volcano';
              tag = 'fail';
            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'applyId',
      dataIndex: 'applyId',
      render: (text, record, index) => {
        return (
          <>
            <Button type="primary" onClick={() => handleGetID(record)}>
              Detail
            </Button>
            <Modal visible={isModalVisible}
              closable={false}
              footer={null}
            >
              <div className="row">
                <div className="col-12 text-center"><h2>Detail apply</h2></div>
                <div className="col-12 row">
                  <div className="col-4 col-md-4">
                    <h4>ID : </h4>
                  </div>
                  <div className="col-8 col-md-8">
                    <span>{currentDataID.applyId}</span>
                  </div>
                  <div className="col-4 col-md-4">
                    <h4>Student name : </h4>
                  </div>
                  <div className="col-8 col-md-8">
                    <span>{currentDataID.studentName}</span>
                  </div>
                  <div className="col-4 col-md-4">
                    <h4>Student ID : </h4>
                  </div>
                  <div className="col-8 col-md-8">
                    <span>{currentDataID.studentId}</span>
                  </div>
                  <div className="col-4 col-md-4">
                    <h4>Apply date : </h4>
                  </div>
                  <div className="col-8 col-md-8">
                    <span>{moment(currentDataID.applyDate).format('DD/MM/YYYY')}</span>
                  </div>
                  <div className="col-4 col-md-4">
                    <h4>Business ID : </h4>
                  </div>
                  <div className="col-8 col-md-8">
                    <span>{currentDataID.businessId}</span>
                  </div>
                  <div className="col-4 col-md-4">
                    <h4>CV : </h4>
                  </div>
                  <div className="col-8 col-md-8">
                    <span>{currentDataID.cv}</span>
                  </div>
                  <div className="col-4 col-md-4">
                    <h4>Status apply : </h4>
                  </div>
                  <div className="col-8 col-md-8">
                    <span>{String(currentDataID.statusApply).split("").map((tag) => {
                      let color = tag.length > 5 ? 'geekblue' : 'green';

                      if (tag === '1') {
                        color = '#1890ff';
                        tag = 'pending';
                      }
                      else if (tag === '2') {
                        color = '#73d13d';
                        tag = 'approve';
                      }
                      else if (tag === '3') {
                        color = 'volcano';
                        tag = 'fail';
                      }

                      return (
                        <Tag color={color} key={tag}>
                          {tag.toUpperCase()}
                        </Tag>
                      );
                    })}</span>
                  </div>
                </div>
                <div className="col-12 text-right">
                  {currentDataID.statusApply === 1 && (
                    <>
                    <Button className="btn-success mr-2" onClick={() => handleUpdateStatus(currentStatus,"approve")} size={5}>Approve</Button>
                      <Button className="btn-dark mr-2" onClick={() => handleUpdateStatus(currentStatus,"reject")} size={5}>Reject</Button>
                    </>
                  )}
                  <Button type="danger" onClick={handleOk} size={5}>Close</Button>
                </div>
              </div>
            </Modal>
          </>
        )
      },
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataTabe} />
    </>
  )
}
