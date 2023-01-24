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
import { Confirmation, MyNavigator, Loadable, HistoryConfirmation } from "../components";
import ErrorMessage from "../components/errorMessage/errorMessage";

import { setLoaderTrue } from "../services/actions/loader";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const Administration = Loadable(React.lazy(() => import("../pages/main/administration/main")));
const Analytics = Loadable(React.lazy(() => import("../pages/main/asset/analytics")));
const CodeList = Loadable(React.lazy(() => import("../pages/main/configuration/initialize/codelist/codelist")))
const ResourceList = Loadable(React.lazy(() => import("../pages/main/configuration/initialize/resource/resourceList")))
const Configuration = Loadable(React.lazy(() => import("../pages/main/configuration/main")))
const ForgotPassword = Loadable(React.lazy(() => import("../pages/authorization/forgotPassword/forgotPassword")));
const ForgotPasswordConfirm = Loadable(React.lazy(() => import("../pages/authorization/forgotPassword/forgotPasswordConfirm")));
const Login = Loadable(React.lazy(() => import("../pages/authorization/login/login")));
const NotFoundPage = Loadable(React.lazy(() => import("../pages/error/notFound")));
const Items = Loadable(React.lazy(() => import("../pages/main/configuration/items/item")));
const Overview = Loadable(React.lazy(() => import("../pages/main/overview/overview")));
const Project = Loadable(React.lazy(() => import("../pages/main/configuration/project/project")));
const Register = Loadable(React.lazy(() => import("../pages/authorization/register/register")));
const RegisterPageTwo = Loadable(React.lazy(() => import("../pages/authorization/register/registerPageTwo")));
const Reporting = Loadable(React.lazy(() => import("../pages/main/asset/reporting")));
const ReportingDesigner = Loadable(React.lazy(() => import("../pages/main/configuration/initialize/reportDesign/reportDesigner")));
const Tags = Loadable(React.lazy(() => import("../pages/main/configuration/tags/tags")));
const Types = Loadable(React.lazy(() => import("../pages/main/configuration/types/types")));

const AppRouter1 = () => {

  return (

    <React.Fragment>
      <Suspense fallback={<Outlet />}>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/overview/*" element={<Overview />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reporting" element={<Reporting />} />
            <Route path="/tools/report_designer" element={<ReportingDesigner />} />
            <Route path="/administration" element={<Administration />} />
            <Route exact path="/configuration" element={<Configuration way="Configuration" />} />
            <Route exact path="/configuration/:myKey" element={<MyNavigator way="Configuration" />} />
            <Route exact path="/tools" element={<Configuration way="Tools" />} />
            <Route exact path="/tools/:myKey" element={<MyNavigator way="Tools" />} />
            <Route exact path="/tools/tags/tag_manager" element={<Tags isHome={true} />} />
            <Route exact path="/tools/tags/tag_manager/:tags" element={<Tags isHome={false} />} />
            <Route exact path="/tools/types" element={<Types isHome={true} />} />
            <Route exact path="/tools/types/:tags" element={<Types isHome={false} />} />
            <Route exact path="/tools/project" element={<Project isHome={true} />} />
            <Route exact path="/tools/code_list" element={<CodeList isHome={true} />} />
            <Route exact path="/tools/code_list/:codelist" element={<CodeList isHome={false} />} />
            <Route exact path="/tools/resources" element={<ResourceList isHome={true} />} />
            <Route exact path="/tools/resources/:resourceList" element={<ResourceList isHome={false} />} />
            <Route exact path="/configuration/:myKey/:type/:item" element={<Items isHome={false} />} />
            <Route path="/configuration/:myKey/:type" element={<Items isHome={true} />} />
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
        <HistoryConfirmation />
      </Box>
    </HistoryRouter>
  );
};

export default AppRouter;
