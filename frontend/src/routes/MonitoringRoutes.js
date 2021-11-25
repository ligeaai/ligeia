
import Dashboard from '../pages/dashboard/dashboard.component'
import MonitoringLayout from '../layouts/MonitoringLayout';
import requireAuth from '../utils/RequireAuth';



const MonitoringRoutes = {
    path: '/',
    element: <MonitoringLayout />,
    children: [

        {
            path: '/dashboard/default',
            element: <Dashboard />
        },

    ]
};

export default MonitoringRoutes;