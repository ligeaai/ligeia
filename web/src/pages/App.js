import React from 'react';


import Header from '../layout/headers'
import Drawer from '../layout/drawer'
import Router from '../routers/RouterApp';

import Login from './login/index';

import { Grid } from '@mui/material';

function App() {
    return (
        <>
            <Login></Login>
            {/*<Header />
            <Grid container>
                <Drawer />
                <Router/>
            </Grid>*/}
        </>
    );
}

export default App;
