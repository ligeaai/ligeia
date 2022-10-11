import { createSlice } from '@reduxjs/toolkit'

export const fullScreenReducer = createSlice({
    name: 'fullScreen',
    initialState: {
        isFullScreen: false,
    },
    reducers: {
        setIsFullScreen: (state, payload) => {
            state.isFullScreen = payload.payload
        },
    },
})


export const { setIsFullScreen } = fullScreenReducer.actions

export default fullScreenReducer.reducer