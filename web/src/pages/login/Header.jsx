import * as React from 'react';

import { Grid, Link } from '@mui/material';

import logo from '../../assets/Images/header/Logo.png'


import LangSelector from '../../components/LangSelector'

const Header = () => {
    return (
        <Grid container alignItems="center" justifyContent="space-between" sx={{
            borderBottom: 1,
            borderColor: '#E4E4E4',
            backgroundColor: '#FFFFFF'
        }}>
            <Grid item sx={{ml: 2}}>
                <Link href="/" sx={{ color: "inherit" }}>
                    <img src={logo} alt="" />
                </Link>
            </Grid>
            <Grid item>
                <LangSelector/>
            </Grid>
        </Grid>

    );
}

export default Header