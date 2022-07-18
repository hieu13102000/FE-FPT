import React, { useState, useEffect } from "react";
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { getDataByPathTest } from "../../../../service/data";

import EditJobPost from "./editJobPost"
export default function detailJobPost() {
  const [dataDetail, setDataDetail] = useState([]);
  const [tab, setTab] = useState(false);

  useEffect(() => {
    loadDetailJobPost();
  }, [tab]);
  //load List Department
  async function loadDetailJobPost() {
    if (localStorage && localStorage.getItem("accessToken") && localStorage.getItem("userID")) {
      const accessToken = localStorage.getItem("accessToken");
      const userID = localStorage.getItem("userID");
      const path = `api/v1/job-post/business/${userID}`;
      console.log("phus", accessToken);
      const res = await getDataByPathTest(path, accessToken, "");
      if (res !== null && res !== undefined && res.status === 200) {
        setDataDetail(res.data);
      }
      else {
        setDataDetail([]);
      }
    }
  }
  // console.log("hieu",dataDetail);

  function changeTab(childData) {
    setTab(childData)
  }

  return (
    <>{!dataDetail.length > 0 ?
      <>
        {!tab ? (
          <div className="col-12" style={{ backgroundColor: 'white', height: "inherit" }}>
            <div className="row ml-3">
              <div className="col-10 my-4 text-center align-self-center">
                <h1>Detail Job</h1>
              </div>
              <div className="col-2 my-4 text-right">
                <button type="button" className="btn btn-secondary" onClick={() => { setTab(true) }}>Edit</button>
              </div>

              <div className="col-2">
                <h4>Job Name :</h4>
              </div>
              <div className="col-10">
                <span>{dataDetail.jobName}</span>
              </div>

              <div className="col-2">
                <h4>Detail Work :</h4>
              </div>
              <div className="col-10">
                <span>{dataDetail.detailWork}</span>
              </div>

              <div className="col-2">
                <h4>Request :</h4>
              </div>
              <div className="col-10">
                <span>{dataDetail.request}</span>
              </div>

              <div className="col-2">
                <h4>Salary :</h4>
              </div>
              <div className="col-10">
                <span>{dataDetail.salary}</span>
              </div>

              <div className="col-2">
                <h4>Work Location :</h4>
              </div>
              <div className="col-10">
                <span>{dataDetail.workLocation}</span>
              </div>
            </div>
          </div>) : <EditJobPost payLoad={dataDetail} change={changeTab} />}
      </>
      :
      <Result
        status="warning"
        title="No data warning"
        extra={
          <Button type="primary" key="console">
            <Link to='/createJob'>Go back</Link>
          </Button>
        }
      />
    }
    </>
  )
}
