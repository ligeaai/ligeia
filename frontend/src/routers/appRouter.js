import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

import { Box } from "@mui/material"

import history from "./history";


import PrivateRoute from "./privateRouter";
import PublicRoute from "./publicRouter";
import Start from "../pages/start/start";

import Main from "../pages/main/main";
import { Confirmation, MyNavigator, Loadable } from "../components";
import ErrorMessage from "../components/errorMessage/errorMessage";

import { setLoaderTrue } from "../services/actions/loader";


const Administration = Loadable(React.lazy(() => import("../pages/main/administration/main")));
const Analytics = Loadable(React.lazy(() => import("../pages/main/asset/analytics")));
const CodeList = Loadable(React.lazy(() => import("../pages/main/configuration/initialize/codelist/codelist")))
const Configuration = Loadable(React.lazy(() => import("../pages/main/configuration/main")))
const ForgotPassword = Loadable(React.lazy(() => import("../pages/authorization/forgotPassword/forgotPassword")));
const ForgotPasswordConfirm = Loadable(React.lazy(() => import("../pages/authorization/forgotPassword/forgotPasswordConfirm")));
const Login = Loadable(React.lazy(() => import("../pages/authorization/login/login")));
const NotFoundPage = Loadable(React.lazy(() => import("../pages/error/notFound")));
const OrganizationAndItems = Loadable(React.lazy(() => import("../pages/main/configuration/organization/organizationAndItems")));
const Overview = Loadable(React.lazy(() => import("../pages/main/asset/overview")));
const Register = Loadable(React.lazy(() => import("../pages/authorization/register/register")));
const RegisterPageTwo = Loadable(React.lazy(() => import("../pages/authorization/register/registerPageTwo")));
const Reporting = Loadable(React.lazy(() => import("../pages/main/asset/reporting")));
const Tags = Loadable(React.lazy(() => import("../pages/main/configuration/tags/tags")));


const AppRouter1 = () => {

  return (

    <React.Fragment>
      <Suspense fallback={<Outlet />}>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Main />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/administration" element={<Administration />} />
            <Route exact path="/configuration" element={<Configuration />} />
            <Route exact path="/configuration/:myKey" element={<MyNavigator />} />
            <Route exact path="/configuration/tools/tags" element={<Tags isHome={true} />} />
            <Route exact path="/configuration/tools/code_list" element={<CodeList isHome={true} />} />
            <Route exact path="/configuration/tools/code_list/:codelist" element={<CodeList isHome={false} />} />
            <Route exact path="/configuration/:myKey/:type/:item" element={<OrganizationAndItems isHome={false} />} />
            <Route path="/configuration/:myKey/:type" element={<OrganizationAndItems isHome={true} />} />
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
      </Suspense>
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
