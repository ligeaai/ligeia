import { Navigate, Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout'
import SignIn from '../pages/authorization/sign-in/login.component';
import SignUp from '../pages/authorization/sign-up/signup.component';

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


const AuthenticationRoutes = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            path: '/',
            element: <SignIn />
        },
        {
            path: '/sign-up',
            element: <SignUp />
        }
    ]
};

export default AuthenticationRoutes;