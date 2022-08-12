import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../layout/layout';
import Login from '../pages/login/login/Login'
import PrivateRoute from './PrivateRouter';
import Monitoring from '../pages/monitoring/monitoring'
import ServicePage from '../pages/servicePage/servicePage'
import FailureDirectory from '../pages/failureDirectory/failureDirectory'
import IntegrationLog from '../pages/integrationLog/IntegrationLog'
import DatabasePage from '../pages/databasePage/DatabasePage'
import ReportsPage from '../pages/reportsPage/ReportsPage'

import CodeList from '../pages/code_list';
const AppRouter = () => {
    return (
        <Router>
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
                    <Route exact path='/login' element={<Login />} />
                </Routes>
            </Fragment>
        </Router>

    );
}

export default AppRouter