import { createSlice } from '@reduxjs/toolkit'

export const cssUserSelect = createSlice({
    name: 'cssUserSelect',
    initialState: {
        userSelect: false,
    },
    reducers: {
        setCssUserSelect: (state, payload) => {
            state.userSelect = payload.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setCssUserSelect } = cssUserSelect.actions

export default cssUserSelect.reducer