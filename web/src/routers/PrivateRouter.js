import React from 'react';
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

import Header from '../layout/headers/Header';
import Drawer from '../layout/drawer/Drawer';
import { Grid } from '@mui/material';

const PrivateRoute = () => {

    const auth = useSelector((state) => state.auth.auth);

    return auth ? <>
        <Header />
        <Grid container flexWrap="nowrap">
            <Grid item>
                <Drawer />
            </Grid>
            <Grid item>
                <Outlet />
            </Grid>

        </Grid>


    </> : <Navigate to="/login" />;
}

export default PrivateRoute;