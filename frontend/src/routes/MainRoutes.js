
import AddEntity from '../pages/addentity/addEntity.component';
import Analytics from '../pages/analytics/analytics.component';
import Dashboard from '../pages/dashboard/dashboard.component';
import Database from '../pages/database/database.component';
import DataLog from '../pages/dataLog/dataLog.component';
import EventLog from '../pages/eventLog/eventLog.component';
import FailureLog from '../pages/failureLog/failureLog.component';
import IntegrationsLog from '../pages/integrationsLog/integrationsLog.component';
import { Navigate, Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/MonitoringLayout/index';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            authed
                ? <Component {...props} />
                : <Navigate to="/login" />
        )}
    />
);

const MainRoutes = {
    path: '/',
    element: <AdminLayout />,
    children: [

        {
            path: '/dashboard/analytics',
            element: <Analytics />
        },
        {
            path: '/apps/integrations-log',
            element: <IntegrationsLog />
        },
        {
            path: '/apps/event-log',
            element: <EventLog />
        },
        {
            path: '/apps/failure-log',
            element: <FailureLog />
        },
        {
            path: '/apps/data-log',
            element: <DataLog />
        },
        {
            path: '/apps/database',
            element: <Database />
        },
        {
            path: '/administration/add-entity',
            element: <AddEntity />
        }
    ]
};

export default MainRoutes;