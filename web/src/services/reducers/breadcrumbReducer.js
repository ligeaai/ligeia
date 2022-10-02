import { createSlice } from '@reduxjs/toolkit'

export const breadcrumbReducer = createSlice({
    name: 'breadcrumb',
    initialState: {
        breadcrumb: ["overview"],
    },
    reducers: {
        setBreadcrumb: (state, payload) => {
            state.breadcrumb = payload.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setBreadcrumb } = breadcrumbReducer.actions

export default breadcrumbReducer.reducer