import { createSlice } from '@reduxjs/toolkit'


export const langReducer = createSlice({
    name: 'language',
    initialState: { lang: "English" },
    reducers: {
        changeLang(state, action) {
            return { ...state, lang: action.payload };
        }
    }
})



export default langReducer.reducer