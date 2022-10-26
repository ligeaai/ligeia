import { createSlice } from '@reduxjs/toolkit'

export const childCodeList = createSlice({
    name: 'childCodeList',
    initialState: {
        dataGridItems: {},
        changedItems: [],
        deletedItems: [],
        newItems: {}
    },
    reducers: {
        setDataGridItems: (state, payload) => {
            state.dataGridItems[payload.payload.key] = payload.payload.value
        },
        setNewItem: (state, payload) => {
            state.dataGridItems[payload.payload.uuid] = payload.payload.value
            state.newItems[payload.payload.uuid] = payload.payload.value
        },
        setDeletedItem: (state, payload) => {
            delete state.dataGridItems[payload.payload];
            state.deletedItems = [...new Set([...state.deletedItems, payload.payload])]
        },
        cleanDataGridItems: (state, payload) => {
            state.dataGridItems = {}
            state.changedItems = []
            state.deletedItems = []
            state.newItems = {}
        },
        changeDataGridItems: (state, payload) => {
            state.dataGridItems[payload.payload.id][payload.payload.field] = payload.payload.value;
            state.changedItems = [...new Set([...state.changedItems, payload.payload.id])]
        }
    },
})

// Action creators are generated for each case reducer function
export const { cleanDataGridItems, setDataGridItems, setDeletedItem, setNewItem, changeDataGridItems } = childCodeList.actions

export default childCodeList.reducer