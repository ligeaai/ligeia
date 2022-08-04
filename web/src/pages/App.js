import React from 'react';


import Header from '../layout/headers'
import Drawer from '../layout/drawer'
import Router from '../routers/RouterApp';

import { Grid } from '@mui/material';

function App() {
    return (
        <>
            <Header />
            <Grid container>
                <Drawer />
                <Router/>
            </Grid>
        </>
    );
}

export default App;
