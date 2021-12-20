<<<<<<< HEAD
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';



// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
    return useRoutes([AuthenticationRoutes, MainRoutes,],);
}
=======
import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import MonitoringRoutes from './MonitoringRoutes';


// ==============================|| ROUTING RENDER ||============================== //

export default function Routes() {
    return useRoutes([AuthenticationRoutes, MainRoutes, MonitoringRoutes],);
}
>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
