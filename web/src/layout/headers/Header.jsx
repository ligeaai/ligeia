import * as React from 'react';
import { useDispatch } from 'react-redux'

import { Avatar, Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import logo from '../../assets/Images/header/Group 1.png'
import menuIcon from '../../assets/Images/header/Menu.png'
import { toggleDrawer } from '../../services/reducers/drawerReducer'

const Mobil = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      display: "none",
    }
  }));

const Pc = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
      display: "none",
    }
  }));

const Header = () => {
    const dispatch = useDispatch()
    return (
        <Grid container alignItems="center" justifyContent="space-between" sx={{
            borderBottom: 1,
            borderColor: '#E4E4E4',
            backgroundColor: '#FFFFFF'
        }}>
            <Grid item>
                <Grid container spacing={2} sx={{ml:2}} alignItems="center">
                    <Grid item sx={{
                            cursor: "pointer"
                        }}>                   
                        <img src={menuIcon} alt="" onClick={() => { dispatch(toggleDrawer()) }}/>
                    </Grid>
                    <Grid item>
                        <Mobil>
                            <Link href="/" sx={{ color: "inherit" }}>
                                <img src={logo} alt="" />
                            </Link>
                        </Mobil>
                    </Grid>
                </Grid>
            </Grid>
            <Pc>
                <Grid item>
                    <Link href="/" sx={{ color: "inherit" }}>
                        <img src={logo} alt="" />
                    </Link>
                </Grid>
            </Pc>
            <Grid item>
                <Grid container alignItems="center">
                    <Mobil>
                        <Grid item id="txt">
                            names
                        </Grid>
                    </Mobil>
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

export default Header