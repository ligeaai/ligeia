import React from 'react';
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import Main from '../layout/main/main';

const PrivateRoute = () => {
    const auth = useSelector((state) => state.auth.token);
    return auth ? <Main Element={<Outlet />} delSearchBar={true} /> : <Navigate to="/home" />;
}

export default PrivateRoute;