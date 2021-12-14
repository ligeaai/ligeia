import { lazy } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import Loadable from '../ui-component/Loadable'

//Administration 
const Analytics = Loadable(lazy(() => import('../pages/analytics/analytics.component')));
const Companys = Loadable(lazy(() => import('../pages/administration/models/companys/companys.component')));
const CompanyEdit = Loadable(lazy(() => import('../pages/administration/models/companys/companyEdit/companyEdit.component')));
const CompanyAdd = Loadable(lazy(() => import('../pages/administration/models/companys/companyAdd/companyAdd.component')));
const Profile = Loadable(lazy(() => import('../pages/profile/profile.component')))

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
        },
        {
            path: '/profile/:id',
            element: <Profile />
        }

    ]
};

export default MainRoutes;