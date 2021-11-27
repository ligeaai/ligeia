
import Companys from "../pages/companys/companys.component"
import Analytics from '../pages/analytics/analytics.component';
import Database from '../pages/database/database.component';
import DataLog from '../pages/dataLog/dataLog.component';
import EventLog from '../pages/eventLog/eventLog.component';
import FailureLog from '../pages/failureLog/failureLog.component';
import IntegrationsLog from '../pages/integrationsLog/integrationsLog.component';
import AdminLayout from '../layouts/AdminLayout';
import CompanyAdd from "../pages/companys/companyAdd/companyAdd.component";
import Batterys from "../pages/batterys/batterys.component";
import BatteryAdd from "../pages/batterys/batteryAdd/batteryAdd.component";


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
            path: '/administration/companys',
            element: <Companys />
        },
        {
            path: '/administration/companys/add',
            element: <CompanyAdd />
        },
        {
            path: '/administration/batterys',
            element: <Batterys />
        },
        {
            path: '/administration/batterys/add',
            element: <BatteryAdd />
        }
    ]
};

export default MainRoutes;