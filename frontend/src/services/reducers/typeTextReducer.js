import { createSlice } from '@reduxjs/toolkit'

export const typeTextReducer = createSlice({
    name: 'typeText',
    initialState: {

    },
    reducers: {
        setTextValue: (state, payload) => {
            return payload.payload
        },
        changeTextValue: (state, payload) => {
            return {
                ...state,
                [payload.payload.key]: payload.payload.value
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setTextValue, changeTextValue } = typeTextReducer.actions

export default typeTextReducer.reducer