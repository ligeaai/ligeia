import React from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from "@mui/material";
import Header from "./header/index";
import Sidebar from "./sidebar/index";
import navigation from '../../menu-items/';
import Breadcrumbs from '../../ui-component/extended/Breadcrumbs'
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { drawerWidth } from "../../store/constant";
import { headerHeight } from '../../store/constant';
import { SET_MENU } from "../../store/actions";


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    margin: 42,
    padding: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -(drawerWidth - 0),
      marginRight: 0,
      marginTop: 20,
      padding: 0,
      width: `calc(100% - ${drawerWidth}px)`,

    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: 20,
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '0px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: 2,
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '0px',
    }
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
      marginRight: '0px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0px'
    }
  })
}));

const MainLayout = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  useEffect(() => {
    dispatch({ type: SET_MENU, opened: !matchDownMd });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        style={{ height: "62px", boxShadow: "0px 0.5px 5px 0px rgba(0, 0, 0, 0.1)" }}
        sx={{
          bgcolor: "#FFFFFF",
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar >
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>
      <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      <Main theme={theme} open={leftDrawerOpened}   >

        <Breadcrumbs separator={ChevronRightOutlinedIcon} navigation={navigation} icon title rightAlign style={{ margin: 0 }} />
        <Outlet />
      </Main>
    </Box >
  );
};

export default MainLayout;