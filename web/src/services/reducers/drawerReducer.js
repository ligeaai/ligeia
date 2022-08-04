import { createSlice } from '@reduxjs/toolkit'

export const drawerReducer = createSlice({
    name: 'drawer',
    initialState: { width: "244px" },
    reducers: {
        toggleDrawer: (state) => {
            if (state.width === "0px") {
                state.width = "244px"
            }
            else {
                state.width = "0px"
            }

        },

    },
})

// Action creators are generated for each case reducer function
export const { toggleDrawer } = drawerReducer.actions

export default drawerReducer.reducer