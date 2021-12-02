import React from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';
import MenuList from './MenuListMini'
import MenuCard from './MenuCardMini'

const drawerWidth = 80

function SidebarMini({ drawerOpen, drawerToggle, window }) {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));

    const drawer = (
        <>

            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '16px',
                        paddingRight: '16px'
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
            style={{ boxShadow: "0px 0.5px 0.5px 0px rgba(0, 0, 0, 0.5)" }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}

                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: theme.palette.background.default,
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: '62px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    )
}

SidebarMini.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default SidebarMini