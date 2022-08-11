import { createSlice } from '@reduxjs/toolkit'

export const authReducer = createSlice({
    name: 'auth',
    initialState: { auth: false },
    reducers: {
        setAuthTrue: (state, data) => {
            console.log(state.auth);
            if (data.payload[0].username === "ligeia" && data.payload[0].password === "ligeia") {
                state.auth = true
            }
            console.log(state.auth);
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAuthTrue } = authReducer.actions

export default authReducer.reducer