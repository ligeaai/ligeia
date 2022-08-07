import { createSlice } from '@reduxjs/toolkit'

export const langReducer = createSlice({
    name: 'language',
    initialState: { lang: "English" },
    reducers: {
        changeLang: (state,lang) => {
            state.lang = lang.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { changeLang } = langReducer.actions

export default langReducer.reducer