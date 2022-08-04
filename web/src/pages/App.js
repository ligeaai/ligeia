import React from 'react';


import MonitoringHeader from '../layout/headers'
import Drawer from '../layout/drawer'
import Router from '../routers/RouterApp';

import { Grid, Stack } from '@mui/material';

function App() {
    return (
        <>
            <MonitoringHeader />
            <Grid container>
                <Drawer />
                <Router/>
            </Grid>
        </>
    );
}

export default App;
