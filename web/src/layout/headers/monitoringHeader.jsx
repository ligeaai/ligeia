import * as React from 'react';
import { useDispatch } from 'react-redux'

import { Avatar, Grid, Link } from '@mui/material';

import logo from '../../assets/Images/header/Group 1.png'
import menuIcon from '../../assets/Images/header/Menu.png'
import { toggleDrawer } from '../../services/reducers/drawerReducer'

const MonitoringHeader = () => {
    const dispatch = useDispatch()
    return (
        <Grid container justifyContent="space-between" alignItems="center" sx={{
            borderBottom: 1,
            borderColor: '#E4E4E4',
            backgroundColor: '#FFFFFF'
        }}>
            <Grid item>
                <Grid container alignItems="center">
                    <Grid  sx={{
                            mx: 2,
                            my: 1.5,
                            p: 0.5,
                            cursor: "pointer"
                        }}>
                            <img src={menuIcon} alt="" onClick={() => { dispatch(toggleDrawer()) }}/>

                    </Grid>
                    <Grid>
                        <Link href="#" underline='none' sx={{ color: "inherit" }}>
                            <img src={logo} alt="" />
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container alignItems="center">
                    <Grid item>
                        names
                    </Grid>
                    <Grid item>
                        <Avatar alt="Name" src="/" sx={{
                            my: 1,
                            mr: 3,
                            ml: 1
                        }} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}

export default MonitoringHeader