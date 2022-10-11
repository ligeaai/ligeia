import { createSlice } from '@reduxjs/toolkit'

export const drawerReducer = createSlice({
    name: 'drawer',
    initialState: {
        isOpen: false,
        temp: 0,//temporary value determines the drawer stat before the drawer hover
    },
    reducers: {
        toggleDrawer: (state) => {
            state.isOpen = !state.isOpen
        },
        mouseEnterDrawer: (state) => {
            if (state.isOpen === false) {
                state.temp = 1
                state.isOpen = true
            }
        },
        mouseLeaveDrawer: (state) => {
            if (state.temp === 1) {
                state.temp = 0
                state.isOpen = false
            }
        },
        setActive: (state, payload) => {
            state.isActive = payload.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { toggleDrawer, mouseEnterDrawer, mouseLeaveDrawer, setActive } = drawerReducer.actions

export default drawerReducer.reducer