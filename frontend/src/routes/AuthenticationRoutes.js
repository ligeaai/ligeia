
import AuthLayout from '../layouts/AuthLayout'
import SignIn from '../pages/authorization/sign-in/login.component';
import SignUp from '../pages/authorization/sign-up/signup.component';




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