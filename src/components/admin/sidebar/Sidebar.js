import React from "react";
import { useHistory } from "react-router-dom";
import "./sidebar.css";
import {
  Person,
  BarChart,
  Apartment,
  Bookmark,
  Category,
  KeyboardBackspace,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useUserAuth } from "../../../context/UserAuthContext";
import { NavLink } from "reactstrap";

function Sidebar() {
  const { logOut } = useUserAuth();
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
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div
          className="sidebarMenu"
          style={{ position: "sticky", top: "100px" }}
        >
          <ul className="sidebarList">
            <NavLink to="/company" tag={Link}>
              <li className="sidebarListItem">
                <span className="nav-link-inner--text font-weight-bold">
                  <Apartment className="sidebarIcon" />
                  Company Home
                </span>
              </li>
            </NavLink>
            <NavLink to="/studentapply" tag={Link}>
              <li className="sidebarListItem">
                <span className="nav-link-inner--text font-weight-bold">
                  <Person className="sidebarIcon" />
                  Student Apply
                </span>
              </li>
            </NavLink>
            <NavLink to="/semester" tag={Link}>
              <li className="sidebarListItem">
                <span className="nav-link-inner--text font-weight-bold">
                  <BarChart className="sidebarIcon" />
                  Semester
                </span>
              </li>
            </NavLink>
            <NavLink to="/department" tag={Link}>
              <li className="sidebarListItem">
                <span className="nav-link-inner--text font-weight-bold">
                  <Bookmark className="sidebarIcon" />
                  Department
                </span>
              </li>
            </NavLink>
            <NavLink to="/industry" tag={Link}>
              <li className="sidebarListItem">
                <span className="nav-link-inner--text font-weight-bold">
                  <Category className="sidebarIcon" />
                  Industry
                </span>
              </li>
            </NavLink>
          </ul>
          {/* <h3 className="sidebarTitle">Staff</h3> */}
          <ul className="sidebarList" style={{ borderTop: "2px solid black" }}>
            <li className="sidebarListItem" onClick={() => handleLogout()}>
              <span className="nav-link-inner--text font-weight-bold">
                <KeyboardBackspace className="sidebarIcon" />
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
