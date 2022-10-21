import { createSlice } from '@reduxjs/toolkit'

export const confirmation = createSlice({
    name: 'confirmation',
    initialState: { isOpen: false, agreefunction: () => { }, title: "", body: "" },
    reducers: {
        cleanConfirmationState: (state) => {
            state.agreefunction = () => { }
            state.title = ""
            state.body = ""
            state.isOpen = false
        },
        setConfirmation: (state, payload) => {
            state.isOpen = true
            state.title = payload.payload.title
            state.body = payload.payload.body
            state.agreefunction = payload.payload.agreefunction
        },
    },
})

// Action creators are generated for each case reducer function
export const { cleanConfirmationState, setConfirmation } = confirmation.actions

export default confirmation.reducer