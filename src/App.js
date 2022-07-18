import React from "react";
// import { Routes, Route, Router } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Listcompany from "./components/admin/listcompany/Listcompany";
import CreateCompany from "./components/admin/listcompany/CreateCompany";
import Department from "./components/admin/deparment/Department";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { createBrowserHistory } from "history";
import Semester from "./components/admin/semester/Semester";
import Industry from "./components/admin/industry/Industry";
import StudentApply from "./components/admin/studentApply/StudentApply";

// business layout

import BusinessLayout from "./components/business/layout";
import ListApplyJobPost from "./components/business/components/jobpost/ListApplyJobPost";
import DetailBusinesses from "./components/business/components/businesses/detailBusinesses";
import CreateJob from "./components/business/components/jobpost/CreateJob";
import DetailJob from "./components/business/components/jobpost/detailJobPost"
import CreateSemester from "./components/admin/semester/CreateSemester";



// import { Business, Create } from "@material-ui/icons";
export const history = createBrowserHistory();
function App() {
  // const user = localStorage.getItem("accessToken");
  return (
    <>
      <Router>
        <UserAuthContextProvider history={history}>
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route
              exact
              path="/company/create"
              render={(props) => <CreateCompany {...props} />}
            />
            <Route
              exact
              path="/company"
              render={(props) => <Listcompany {...props} />}
            />
            <Route
              exact
              path="/studentapply"
              render={(props) => <StudentApply {...props} />}
            />
            <Route
              exact
              path="/department"
              render={(props) => <Department {...props} />}
            />
            <Route
              exact
              path="/semester/create"
              render={(props) => <CreateSemester {...props} />}
            />
            <Route
              exact
              path="/semester"
              render={(props) => <Semester {...props} />}
            />
            <Route
              exact
              path="/industry"
              render={(props) => <Industry {...props} />}
            />
            <Route
              path="/jobpost"
              render={(props) => <StudentApply {...props} />}
            ></Route>

            <Route path="/:path?" exact>
              <BusinessLayout>
                <Switch>
                  <Route path="/createJob" exact component={CreateJob} />
                  <Route path="/detailJob" exact component={DetailJob} />
                  <Route path="/listApply" exact component={ListApplyJobPost} />
                  <Route path="/detailBusinesses" component={DetailBusinesses}
                  />
                </Switch>
              </BusinessLayout>
            </Route>
          </Switch>
        </UserAuthContextProvider>
      </Router>
    </>
  );
}

export default App;
