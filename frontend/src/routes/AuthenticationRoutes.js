
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

export default AuthenticationRoutes;