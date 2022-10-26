import { createSlice } from '@reduxjs/toolkit'

export const codeListChildReducer = createSlice({
    name: 'codeListChild',
    initialState: {
        currentChild: "",
        rowId: "",
        index: 0,
        lastItem: "",
    },
    reducers: {
        setCodeListChild: (state, payload) => {
            state.currentChild = payload.payload.currentChild
        },
        setRowId: (state, payload) => {
            state.rowId = payload.payload.rowId
        },
        setIndex: (state, payload) => {
            if (payload.payload.index === -2) {
                state.index = -2
                state.currentChild = "new"
                return;
            }
            if (payload.payload.index >= 0) {
                if (payload.payload.index < state.lastItem) {
                    state.index = payload.payload.index
                }
                else {
                    state.index = 0
                }
            }
            else {
                state.index = state.lastItem - 1
            }
        },
        setLastItemIndex: (state, payload) => {
            state.lastItem = payload.payload.lastItem
        },

    },
})

// Action creators are generated for each case reducer function
export const { setCodeListChild, setIndex, setRowId, setLastItemIndex } = codeListChildReducer.actions

export default codeListChildReducer.reducer