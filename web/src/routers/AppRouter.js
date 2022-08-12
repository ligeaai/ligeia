import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";

import history from './history';

import CodeList from '../pages/code_list';
import DatabasePage from '../pages/databasePage/DatabasePage'
import FailureDirectory from '../pages/failureDirectory/failureDirectory'
import Layout from '../layout/layout';
import Login from '../pages/login/login/Login'
import LoginLayout from '../pages/login/LoginLayout'
import Monitoring from '../pages/monitoring/monitoring'
import NewPassword from '../pages/login/newPassword/newPassword';
import PassRecovery from '../pages/login/passRecovery/PassRecovery'
import PrivateRoute from './PrivateRouter';
import ReportsPage from '../pages/reportsPage/ReportsPage'
import SecureCodePage from '../pages/login/secureCodepage/secureCodePage'
import ServicePage from '../pages/servicePage/servicePage'
import IntegrationLog from '../pages/integrationLog/IntegrationLog'

const AppRouter = () => {
    return (
        <HistoryRouter history={history}>
            <Fragment>
                <Routes>
                    <Route exact path='/' element={<PrivateRoute />}>
                        <Route exact path='/' element={<Layout />}>
                            <Route path='monitoring' element={<Monitoring />} />
                            <Route path='service' element={<ServicePage />} />
                            <Route path='failuredirectory' element={<FailureDirectory />} />
                            <Route path='log' element={<IntegrationLog />} />
                            <Route path='database' element={<DatabasePage />} />
                            <Route path='reports' element={<ReportsPage />} />
                            <Route path='codelist' element={<CodeList />} />
                        </Route>
                    </Route>
                    <Route exact path='/login' element={<LoginLayout />} >
                        <Route path='' element={<Login />} />
                        <Route path='passrecovery' element={<PassRecovery />} />
                        <Route path='securecode' element={<SecureCodePage />} />
                        <Route path='newpassword' element={<NewPassword />} />
                    </Route>
                </Routes>
            </Fragment>
        </HistoryRouter>

    );
}

export default AppRouter