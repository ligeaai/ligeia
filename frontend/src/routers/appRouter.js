import React from "react";
import { Route, Routes } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import history from "./history";

import Administration from "../pages/main/administration/main";
import Analytics from "../pages/main/asset/analytics";
import NotFoundPage from "../pages/notFound/notFound";
import ForgotPassword from "../pages/authorization/forgotPassword/forgotPassword";
import ForgotPasswordConfirm from "../pages/authorization/forgotPassword/forgotPasswordConfirm";
import Overview from "../pages/main/asset/overview";
import Login from "../pages/authorization/login/login";
import Register from "../pages/authorization/register/register";
import RegisterPageTwo from "../pages/authorization/register/registerPageTwo";
import Reporting from "../pages/main/asset/reporting";
import PrivateRoute from "./privateRouter";
import PublicRoute from "./publicRouter";
import Start from "../pages/start/start";
import Company from "../pages/main/configuration/organization/unitOne";


import Main from "../pages/main/main";

import ErrorMessage from "../components/errorMessage/errorMessage";

const AppRouter1 = () => {
  return (

    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="" element={<Main />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reporting" element={<Reporting />} />
          <Route path="/administration" element={<Administration />} />
          <Route path="/configuration/organization/company" element={<Company />} />
        </Route>
        <Route exact path="/" element={<PublicRoute />}>
          <Route exact path="/home" element={<Start />} />
          <Route exact path="/signin">
            <Route path="" element={<Login />} />
            <Route path="/signin/forgotpassword" element={<ForgotPassword />} />
            <Route path="/signin/forgotpasswordconfirm/:token" element={<ForgotPasswordConfirm />} />
          </Route>
          <Route exact path="/signup">
            <Route path="" element={<Register />} />
            <Route path="/signup/signup" element={<RegisterPageTwo />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </React.Fragment>
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
