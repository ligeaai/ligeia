import React from 'react'
import { useSelector } from 'react-redux'

import { Grid } from '@mui/material';

import DrawerItem from './DrawerItem'


const Drawer = () => {
    const drawer = useSelector((state) => state.drawer);
    return (
        <Grid container item sx={{
            paddingTop: "17px !important",
            backgroundColor: "#FAFBFC",
            width: `${drawer.width}`,
            minHeight: "calc(100vh - 57px)",
            alignContent: "flex-start",
            overflow:"hidden",
            transition: ".2s"
        }}>
            <DrawerItem/>
        </Grid>
    )
}

export default Drawer