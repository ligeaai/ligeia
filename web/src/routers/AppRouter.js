import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import history from './history';

import AdminRouter from './AdminRouter';
import AllUsers from '../pages/servicePage/allusers/allusers';
import ChangePass from '../pages/changepass/ChangePass'
import CodeList from '../pages/code_list';
//import DatabasePage from '../pages/databasePage/DatabasePage'
import DatabasePage from '../pages/code_list'
import FailureDirectory from '../pages/failureDirectory/failureDirectory'
import Layout from '../layout/layout';
import Login from '../pages/authorization/login/login'
import LoginLayout from '../layout/start/Start'
import Monitoring from '../pages/monitoring/monitoring'
import NewPassword from '../pages/login/newPassword/newPassword';
import PassRecovery from '../pages/login/passRecovery/PassRecovery'
import PrivateRoute from './PrivateRouter';
import ReportsPage from '../pages/reportsPage/ReportsPage'
import ResetPassword from '../pages/resetpassword/ResetPassword'
import SecureCodePage from '../pages/login/secureCodepage/secureCodePage'
import ServicePage from '../pages/servicePage/servicePage'
import Signup from '../pages/signup/Signup'
import Start from '../pages/start/Start'
import IntegrationLog from '../pages/integrationLog/IntegrationLog'

import ErrorMessage from '../components/HOC/errorMessage';

const AppRouter1 = () => {
    return (
        <Fragment>
            <Routes>
                <Route exact path='/' element={<PrivateRoute />}>
                    <Route exact path='/' element={<Layout />}>
                        <Route path='monitoring' element={<Monitoring />} />
                        <Route exact path='service' element={<ServicePage />} />
                        <Route path='failuredirectory' element={<FailureDirectory />} />
                        <Route path='log' element={<IntegrationLog />} />
                        <Route path='database' element={<DatabasePage />} />
                        <Route path='reports' element={<ReportsPage />} />
                        <Route path='codelist' element={<CodeList />} />
                        <Route path='changepass' element={<ChangePass />} />
                        <Route path='resetpassword' element={<ResetPassword />} />
                        <Route path='service' element={<AdminRouter />}>
                            <Route path='allusers' element={<AllUsers />} />
                        </Route>
                    </Route>
                </Route>
                <Route exact path='home' element={<Start />} />
                <Route exact path='/login'>
                    <Route path='' element={<Login />} />
                    <Route path='passrecovery' element={<PassRecovery />} />
                    <Route path='securecode' element={<SecureCodePage />} />
                    <Route path='newpassword' element={<NewPassword />} />
                </Route>
                <Route exact path='/signup' element={<LoginLayout />} >
                    <Route path='' element={<Signup />} />
                </Route>
            </Routes>
        </Fragment>
    );
}

const AppRouter = () => {
    return (
        <HistoryRouter history={history}>
            <ErrorMessage Element={AppRouter1} />
        </HistoryRouter>
    )
}

export default AppRouter