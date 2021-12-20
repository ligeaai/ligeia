<<<<<<< HEAD
import { lazy } from 'react'
import Loadable from '../ui-component/Loadable';
import AuthLayout from '../layouts/AuthLayout'

const Login = Loadable(lazy(() => import('../pages/authentication/authentication3/Login3')))
const Registration = Loadable(lazy(() => import('../pages/authentication/authentication3/Register3')))

const AuthenticationRoutes = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/registration',
            element: <Registration />
        }
    ]
};

=======

import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/authentication/authentication3/Login3'
import Registration from '../pages/authentication/authentication3/Register3';




const AuthenticationRoutes = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/registration',
            element: <Registration />
        }
    ]
};

>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
export default AuthenticationRoutes;