import { createSlice } from '@reduxjs/toolkit'

export const typeReducer = createSlice({
    name: 'type',
    initialState: {

    },
    reducers: {
        setValue: (state, payload) => {
            return payload.payload
        },
        changeValue: (state, payload) => {
            return {
                ...state,
                [payload.payload.key]: payload.payload.value
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { setValue, changeValue } = typeReducer.actions

export default typeReducer.reducer