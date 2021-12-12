

import Analytics from '../pages/analytics/analytics.component';
import AdminLayout from '../layouts/AdminLayout';

//Administration 
import Companys from "../pages/administration/models/companys/companys.component"
import CompanyAdd from "../pages/administration/models/companys/companyAdd/companyAdd.component";
import CompanyEdit from '../pages/administration/models/companys/companyEdit/companyEdit.component'

const MainRoutes = {
    path: '/',
    element: <AdminLayout />,
    children: [

        {
            path: '/dashboard/analytics',
            element: <Analytics />
        },

        //Administration
        {
            path: '/administration/companies',
            element: <Companys />
        },
        {
            path: '/administration/companies/add',
            element: <CompanyAdd />
        },
        {
            path: '/administration/companies/:id',
            element: <CompanyEdit />
        }


    ]
};

export default MainRoutes;