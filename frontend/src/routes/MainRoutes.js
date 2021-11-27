

import Analytics from '../pages/analytics/analytics.component';
import Database from '../pages/database/database.component';
import DataLog from '../pages/dataLog/dataLog.component';
import EventLog from '../pages/eventLog/eventLog.component';
import FailureLog from '../pages/failureLog/failureLog.component';
import IntegrationsLog from '../pages/integrationsLog/integrationsLog.component';
import AdminLayout from '../layouts/AdminLayout';

//Administration 
import Companys from "../pages/administration/models/companys/companys.component"
import CompanyAdd from "../pages/administration/models/companys/companyAdd/companyAdd.component";
import Batterys from "../pages/administration/models/batterys/batterys.component";
import BatteryAdd from "../pages/administration/models/batterys/batteryAdd/batteryAdd.component";
import Fields from "../pages/administration/models/fields/fields.component";
import FieldAdd from "../pages/administration/models/fields/fieldAdd/fieldAdd.component";

//Dictionaries
import TypeBatterys from '../pages/administration/dictionaries/typeBatterys/typeBatterys.component'
import TypeProducts from '../pages/administration/dictionaries/typeProducts/typeProducts.component'
import TypePumps from '../pages/administration/dictionaries/typePumps/typePumps.component'
import TypeStatus from '../pages/administration/dictionaries/typeStatus/typeStatus.component'
import TypeStatusAdd from "../pages/administration/dictionaries/typeStatus/typeStatusAdd/typeStatusAdd.component"
import TypeBatteryAdd from '../pages/administration/dictionaries/typeBatterys/typeBatteryAdd/typeBatteryAdd.component';
import TypeProductAdd from '../pages/administration/dictionaries/typeProducts/typeProductAdd/typeProductAdd.component';
import TypePumpAdd from '../pages/administration/dictionaries/typePumps/typePumpAdd/typePumpAdd.component';

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
        //Administration
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
        },

        {
            path: '/administration/fields',
            element: <Fields />
        },
        {
            path: '/administration/fields/add',
            element: <FieldAdd />
        },
        //Dictionaries
        {
            path: '/administration/type-batterys',
            element: <TypeBatterys />
        },
        {
            path: '/administration/type-batterys/add',
            element: <TypeBatteryAdd />
        },
        {
            path: "/administration/type-products",
            element: <TypeProducts />
        },
        {
            path: "/administration/type-products/add",
            element: <TypeProductAdd />
        },
        {
            path: "/administration/type-pumps",
            element: <TypePumps />
        },
        {
            path: "/administration/type-pumps/add",
            element: <TypePumpAdd />
        },
        {
            path: "/administration/type-status",
            element: <TypeStatus />
        },
        {
            path: "/administration/type-status/add",
            element: <TypeStatusAdd />
        },
    ]
};

export default MainRoutes;