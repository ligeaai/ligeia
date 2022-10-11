import { createSlice } from '@reduxjs/toolkit'


export const themeReducer = createSlice({
    name: 'theme',
    initialState: { theme: "light" },
    reducers: {
        changeTheme(state, action) {
            return { ...state, theme: action.payload };
        }
    }
})



export default themeReducer.reducer