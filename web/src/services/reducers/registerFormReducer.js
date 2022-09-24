import { createSlice } from '@reduxjs/toolkit'

export const registerFormReducer = createSlice({
    name: 'registerForm',
    initialState: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        isAgree: false
    },
    reducers: {
        setEmailPass: (state, payload) => {
            console.log(payload);
            return {
                ...state,
                email: payload.payload.email,
                password: payload.payload.password,
                isAgree: payload.payload.isAgree
            }
        },

        setFirstLastName: (state, payload) => {
            return {
                ...state,
                firstname: payload.payload.firstname,
                lastname: payload.payload.lastname,
                isAgree: payload.payload.isAgree
            }
        },
        cleanState: (state) => {
            return {
                ...state,
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                isAgree: false
            }
        },
    },
})


export const { setEmailPass, setFirstLastName, cleanState } = registerFormReducer.actions

export default registerFormReducer.reducer