import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter, Outlet } from "react-router-dom";

import { Box } from "@mui/material"

import history from "./history";

import PrivateRoute from "./privateRouter";
import PublicRoute from "./publicRouter";

import { Confirmation, MyNavigator, Loadable, HistoryConfirmation, ErrorMessage } from "../components";
import { applyTheme } from "../services/actions/theme";
import { applyFontSize } from "../services/actions/fontSize";

const Diagnostics = Loadable(React.lazy(() => import("../pages/main/administration/diagnostics/main")));
const Users = Loadable(React.lazy(() => import("../pages/main/administration/users/main")));
const Profile = Loadable(React.lazy(() => import("../pages/main/administration/profile/main")));
const CodeList = Loadable(React.lazy(() => import("../pages/main/configuration/initialize/codelist/codelist")))
const ResourceList = Loadable(React.lazy(() => import("../pages/main/configuration/initialize/resource/resourceList")))
const Configuration = Loadable(React.lazy(() => import("../pages/main/configuration/main")))
const ForgotPassword = Loadable(React.lazy(() => import("../pages/authorization/forgotPassword/forgotPassword")));
const ForgotPasswordConfirm = Loadable(React.lazy(() => import("../pages/authorization/forgotPassword/forgotPasswordConfirm")));
const Login = Loadable(React.lazy(() => import("../pages/authorization/login/login")));
const Main = Loadable(React.lazy(() => import("../pages/main/main")));
const NotFoundPage = Loadable(React.lazy(() => import("../pages/error/notFound")));
const Items = Loadable(React.lazy(() => import("../pages/main/configuration/items/item")));
const Overview = Loadable(React.lazy(() => import("../pages/main/overview/overview")));
const Project = Loadable(React.lazy(() => import("../pages/main/tools/project/main")));
const Register = Loadable(React.lazy(() => import("../pages/authorization/register/register")));
const RegisterPageTwo = Loadable(React.lazy(() => import("../pages/authorization/register/registerPageTwo")));
const Reporting = Loadable(React.lazy(() => import("../pages/main/asset/reporting")));
const ReportingDesigner = Loadable(React.lazy(() => import("../pages/main/configuration/initialize/reportDesign/reportDesigner")));
const Roles = Loadable(React.lazy(() => import("../pages/main/administration/roles/main")));
const Start = Loadable(React.lazy(() => import("../pages/start/start")));
const Tags = Loadable(React.lazy(() => import("../pages/main/configuration/tags/tagManager/tags")));
const TagCalculated = Loadable(React.lazy(() => import("../pages/main/configuration/tags/tagCalculated/main")));
const Types = Loadable(React.lazy(() => import("../pages/main/configuration/types/types")));
const Workflows = Loadable(React.lazy(() => import("../pages/main/tools/workflows/main")));

const AppRouter1 = () => {
  return (
    <React.Fragment>
      <Suspense fallback={<Outlet />}>
        <Routes>
          <Route exact path="/" element={<PrivateRoute />}>
            <Route exact path="/" element={<Main />} />


            <Route exact path="/overview/*" element={<Overview />} />


            <Route exact path="/reporting" element={< Configuration way="Reporting" />} />
            <Route path="/reporting/viewer" element={<Reporting />} />
            <Route path="/reporting/designer" element={<ReportingDesigner />} />


            <Route path="/administration" element={<Configuration way="Administration" />} />
            <Route path="/administration/diagnostics" element={<Diagnostics />} />
            <Route path="/administration/users" element={<Users />} />
            <Route path="/administration/profile" element={<Profile />} />
            <Route path="/administration/roles" element={<Roles isHome={false} />} />
            <Route path="/administration/roles/:roles" element={<Roles isHome={true} />} />


            <Route exact path="/tools" element={<Configuration way="Tools" />} />
            <Route exact path="/tools/types" element={<Types isHome={true} />} />
            <Route exact path="/tools/types/:tags" element={<Types isHome={false} />} />
            <Route exact path="/tools/project" element={<Project isHome={true} />} />
            <Route exact path="/tools/project/:project" element={<Project isHome={false} />} />
            <Route exact path="/tools/code_list" element={<CodeList isHome={true} />} />
            <Route exact path="/tools/code_list/:codelist" element={<CodeList isHome={false} />} />
            <Route exact path="/tools/resources" element={<ResourceList isHome={true} />} />
            <Route exact path="/tools/resources/:resourceList" element={<ResourceList isHome={false} />} />
            <Route exact path="/tools/workflows" element={<Workflows isHome={true} />} />
            <Route exact path="/tools/workflows/:workflows" element={<Workflows isHome={false} />} />


            <Route exact path="/configuration" element={<Configuration way="Configuration" />} />
            <Route exact path="/configuration/:myKey" element={<MyNavigator way="Configuration" />} />
            <Route exact path="/configuration/:myKey/:type/:item" element={<Items isHome={false} />} />
            <Route exact path="/configuration/:myKey/:type/:item/*" element={<Items isHome={false} />} />
            <Route path="/configuration/:myKey/:type" element={<Items isHome={true} />} />

            <Route exact path="/configuration/tags/tag_manager" element={<Tags isHome={true} />} />
            <Route exact path="/configuration/tags/tag_calculated" element={<TagCalculated isHome={true} />} />
            <Route exact path="/configuration/tags/tag_manager/:tags" element={<Tags isHome={false} />} />
            <Route exact path="/configuration/tags/tag_manager/:tags/*" element={<Tags isHome={false} />} />

            <Route path="*" element={<NotFoundPage width="100%" />} />
          </Route>

          <Route exact path="/" element={<PublicRoute />}>
            <Route exact path="/home" element={<Start />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signin/forgotpassword" element={<ForgotPassword />} />
            <Route path="/signin/forgotpasswordconfirm/:token" element={<ForgotPasswordConfirm />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/signup/signup" element={<RegisterPageTwo />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </React.Fragment>
  );
};

const AppRouter = () => {
  React.useEffect(() => {
    applyTheme()
    applyFontSize()
  }, [])
  return (
    <HistoryRouter history={history}>
      <Box id="main-box" >
        <ErrorMessage Element={AppRouter1} />
        <Confirmation />
        <HistoryConfirmation />
      </Box>
    </HistoryRouter>
  );
};

export default React.memo(AppRouter);
