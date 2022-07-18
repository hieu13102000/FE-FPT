import React from 'react'
import {Dropdown, Menu } from 'antd';
import "./headerItem.css";
import { useHistory } from "react-router-dom";
import { useUserAuth } from "../../../../context/UserAuthContext"
export default function headerItem() {
  const { logOut, user } = useUserAuth();
  const navigate = useHistory();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate.push("/");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("roleID");
    } catch (error) {
      console.log(error.message);
    }
  };
    const profile = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a href="#" onClick={() => handleLogout()}>Logout</a>
              ),
            }
          ]}
        />
      );
  return (
    <Dropdown className={'dropdown-trigger'} overlay={profile} placement="bottom">
     <div>
     <span>Hi,</span>
          <span className="mr-4">Business</span>
        <span> <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""className={'img-circle'} /></span>
     </div>
  </Dropdown>
  )
}
