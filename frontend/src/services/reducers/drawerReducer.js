import { createSlice } from '@reduxjs/toolkit'

export const drawerReducer = createSlice({
    name: 'drawer',
    initialState: {
        isOpen: false,
        temp: 0,//temporary value determines the drawer stat before the drawer hover
        width: "68px",
        selectedItem: "Home"
    },
    reducers: {
        setSelectedItem: (state, payload) => {
            state.selectedItem = payload.payload
        },
        toggleDrawer: (state) => {
            state.isOpen = !state.isOpen
            if (state.isOpen) {
                state.width = "248px"
            }
            state.width = "68px"
        },
        mouseEnterDrawer: (state) => {
            if (state.isOpen === false) {
                state.temp = 1
                state.isOpen = true
                state.width = "248px"
            }
        },
        mouseLeaveDrawer: (state) => {
            if (state.temp === 1) {
                state.temp = 0
                state.isOpen = false
                state.width = "68px"
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setSelectedItem, toggleDrawer, mouseEnterDrawer, mouseLeaveDrawer } = drawerReducer.actions

export default drawerReducer.reducer