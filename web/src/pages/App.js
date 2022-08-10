import React from 'react';


import Header from '../layout/headers'
import Drawer from '../layout/drawer'
import Router from '../routers/RouterApp';

import PassRecovery from './login/passRecovery/PassRecovery';
import Login from './login/login/Login';
import { Grid } from '@mui/material';

function App() {
    return (
        <>

            {/*<Login></Login>*/}
            <PassRecovery></PassRecovery>

            {/*<Header />
            <Grid container>
                <Drawer />
                <Router />
            </Grid>*/}
        </>
    );
}

export default App;
