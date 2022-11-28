import { createSlice } from '@reduxjs/toolkit'


export const langReducer = createSlice({
    name: 'language',
    initialState: { lang: "English", cultur: "en-US" },
    reducers: {
        changeLang(state, action) {
            return { ...state, cultur: action.payload };
        }
    }
})



export default langReducer.reducer