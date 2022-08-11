import { createSlice } from '@reduxjs/toolkit'

export const drawerReducer = createSlice({
    name: 'drawer',
    initialState: {
        display: "none",
        temp: 0,//temporary value determines the drawer stat before the drawer hover
        width: "56px"
    },
    reducers: {
        toggleDrawer: (state) => {
            if (state.display === "none") {
                state.display = "inline-block";
                state.width = "252px"
            }
            else {
                state.display = "none";
                state.width = "56px"
            }
        },
        mouseEnterDrawer: (state) => {
            if (state.display === "none") {
                state.temp = 1
                state.display = "inline-block"
            }
        },
        mouseLeaveDrawer: (state) => {
            if (state.temp === 1) {
                state.temp = 0
                state.display = "none"
            }
        },


    },
})

// Action creators are generated for each case reducer function
export const { toggleDrawer, mouseEnterDrawer, mouseLeaveDrawer } = drawerReducer.actions

export default drawerReducer.reducer