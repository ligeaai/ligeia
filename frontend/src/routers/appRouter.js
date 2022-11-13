import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { useSelector } from "react-redux"

import { Box } from "@mui/material"

import history from "./history";

import Administration from "../pages/main/administration/main";
import Analytics from "../pages/main/asset/analytics";
import CodeList from "../pages/main/configuration/initialize/codelist/codelist"
// import CodeList from "../pages/main/configuration/initialize/codeList"
import ForgotPassword from "../pages/authorization/forgotPassword/forgotPassword";
import ForgotPasswordConfirm from "../pages/authorization/forgotPassword/forgotPasswordConfirm";
import Login from "../pages/authorization/login/login";
import NotFoundPage from "../pages/error/notFound";
import OrganizationAndItems from "../pages/main/configuration/organization/organizationAndItems";
import Overview from "../pages/main/asset/overview";
import Register from "../pages/authorization/register/register";
import RegisterPageTwo from "../pages/authorization/register/registerPageTwo";
import Reporting from "../pages/main/asset/reporting";
import PrivateRoute from "./privateRouter";
import PublicRoute from "./publicRouter";
import Start from "../pages/start/start";


import Main from "../pages/main/main";
import { Confirmation } from "../components";
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
          <Route exact path="/configuration/organization/:type/:item" element={<OrganizationAndItems />} />
          <Route path="/configuration/organization/:type" element={<OrganizationAndItems />} />
          <Route exact path="/configuration/items/:type/:item" element={<OrganizationAndItems />} />
          <Route path="/configuration/items/:type" element={<OrganizationAndItems />} />
          <Route exact path="/configuration/initialize/code_list_editor/:codelist" element={<CodeList />} />
          <Route path="/configuration/initialize/code_list_editor" element={<Navigate to="/configuration/initialize/code_list_editor/code_lists" />} />
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
  const cssUserSelect = useSelector((state) => state.cssUserSelect.userSelect);
  return (
    <HistoryRouter history={history}>
      <Box sx={{ userSelect: cssUserSelect ? "none" : "text" }}>
        <ErrorMessage Element={AppRouter1} />
        <Confirmation />
      </Box>
    </HistoryRouter>
  );
};

export default AppRouter;
