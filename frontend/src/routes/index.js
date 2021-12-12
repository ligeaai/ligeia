import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import MonitoringRoutes from './MonitoringRoutes';


// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
    return useRoutes([AuthenticationRoutes, MainRoutes, MonitoringRoutes],);
}
