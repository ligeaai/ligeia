import { createSlice } from '@reduxjs/toolkit'

export const parentCodeList = createSlice({
    name: 'parentCodelist',
    initialState: {
        isUpdated: false,
        ROW_ID: "",
        LIST_TYPE: "",
        CULTURE: "",
        CODE: "",
        CODE_TEXT: ""
    },
    reducers: {
        setParentCodeList: (state, payload) => {
            state.ROW_ID = payload.payload.ROW_ID
            state.LIST_TYPE = payload.payload.LIST_TYPE
            state.CULTURE = payload.payload.CULTURE
            state.CODE = payload.payload.CODE
            state.CODE_TEXT = payload.payload.CODE_TEXT
        },
        setIsUpdated: (state, payload) => {
            state.isUpdated = payload.payload
        },
        changeTextParentCodeList: (state, payload) => {
            state[payload.payload.key] = payload.payload.value
        },
    },
})

// Action creators are generated for each case reducer function
export const { setParentCodeList, setIsUpdated, changeTextParentCodeList } = parentCodeList.actions

export default parentCodeList.reducer