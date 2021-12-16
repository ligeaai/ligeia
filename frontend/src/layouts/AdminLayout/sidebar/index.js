import React, { useCallback } from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import { drawerWidth } from '../../../store/constant';
import { makeStyles } from '@mui/styles';
import MenuList from './MenuList'
import MenuCard from './MenuCard'

export const defaultDrawerWidth = 240;
const minDrawerWidth = 100;
const maxDrawerWidth = 1000;

const useStyles = makeStyles(theme => ({

    dragger: {
        width: "5px",
        cursor: "ew-resize",
        padding: "4px 0 0",
        borderTop: "2px solid #ddd",
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: "#F1F1F1"
    }
}));

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const [drawerWidth, setDrawerWidth] = React.useState(defaultDrawerWidth);
    const classes = useStyles()
    const handleMouseDown = e => {
        document.addEventListener("mouseup", handleMouseUp, true);
        document.addEventListener("mousemove", handleMouseMove, true);
    };

    const handleMouseUp = () => {
        document.removeEventListener("mouseup", handleMouseUp, true);
        document.removeEventListener("mousemove", handleMouseMove, true);
    };

    const handleMouseMove = useCallback(e => {
        const newWidth = e.clientX - document.body.offsetLeft;
        if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
            setDrawerWidth(newWidth);
        }
    }, []);

    const drawer = (
        <>
            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',

                    }}
                >
                    <MenuList />
                    <MenuCard />
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuList />
                    <MenuCard />
                </Box>
            </MobileView>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box component="nav"
            sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }}
            style={{ boxShadow: "0px 0.1px 0.1px 0px rgba(0, 0, 0, 0.1)", }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                // PaperProps={{ style: { width: drawerWidth } }}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        border: '1px solid #F2F4F1',
                        [theme.breakpoints.up('md')]: {
                            top: '52px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                <div onMouseDown={e => handleMouseDown(e)} className={classes.dragger} />
                {drawer}
            </Drawer>
        </Box>

    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default Sidebar;

