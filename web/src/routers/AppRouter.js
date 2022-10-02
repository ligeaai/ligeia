import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import history from "./history";

import Overview from "../pages/main/asset/overview";
import Login from "../pages/authorization/login/login";
import Register from "../pages/authorization/register/register";
import RegisterPageTwo from "../pages/authorization/register/registerPageTwo";
import PrivateRoute from "./privateRouter";
import Start from "../pages/start/start";


import Main from "../pages/main/main";

import ErrorMessage from "../components/HOC/errorMessage";

const AppRouter1 = () => {
  return (
    <Fragment>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="" element={<Main />} />
          <Route path="/overview" element={<Overview />} />
          {/*  <Route path="monitoring" element={<Monitoring />} />
            <Route exact path="service" element={<ServicePage />} />
            <Route path="database" element={<DatabasePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="codelist" element={<CodeList />} />
            <Route path="changepass" element={<ChangePass />} />
            <Route path="resetpassword" element={<ResetPassword />} />
            <Route path="service" element={<AdminRouter />}>
              <Route path="allusers" element={<AllUsers />} />
            </Route>
          </Route> */}
        </Route>
        <Route exact path="/home" element={<Start />} />
        <Route exact path="/signin">
          <Route path="" element={<Login />} />
          {/* <Route path="passrecovery" element={<PassRecovery />} />
          <Route path="securecode" element={<SecureCodePage />} />
          <Route path="newpassword" element={<NewPassword />} /> */}
        </Route>
        <Route exact path="/signup">
          <Route path="" element={<Register />} />
          <Route path="/signup/signup" element={<RegisterPageTwo />} />
        </Route>
      </Routes>
    </Fragment>
  );
};

const AppRouter = () => {
  return (
    <HistoryRouter history={history}>
      <ErrorMessage Element={AppRouter1} />
    </HistoryRouter>
  );
};

export default AppRouter;
