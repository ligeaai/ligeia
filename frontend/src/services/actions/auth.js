import { cleanState } from '../reducers/registerFormReducer';
import { setLoaderFalse } from './loader';
import {
    CHANGE_PASSWORD_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    GITHUB_AUTH_SUCCESS,
    GITHUB_AUTH_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT,
    ADD_ERROR_SUCCESS,
    SNACKBAR_ERROR
} from './types';

import { createTreeViewCouch } from './treeview/treeview';
import history from '../../routers/history';
import Auth from "../api/auth"

export const loadUser = () => async dispatch => {
    if (localStorage.getItem('token')) {
        try {
            const res = await Auth.get()
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            localStorage.removeItem('token');
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const body = JSON.stringify({ email, password });
    try {
        const res = await Auth.login(body)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        });
        await dispatch(setLoaderFalse());
        await dispatch(loadUser());
        history.push(`/`);
    } catch (err) {
        console.log(err);
        dispatch({
            type: LOGIN_FAIL
        })
        dispatch({
            type: SNACKBAR_ERROR,
            payload: { msg: err.response.data.Message[0], type: "info" }
        })
        dispatch(setLoaderFalse());

        if (err.response.data.Message[0] === "Account doesn't exists") {
            history.push("signup")
        }
    }
};

export const signup = (email, first_name, last_name, password) => async dispatch => {
    const body = JSON.stringify({ email, first_name, last_name, password });
    try {
        const res = await Auth.register(body)
        console.log(res);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data.token
        });
        await dispatch(loadUser());
        dispatch(setLoaderFalse());
        dispatch(cleanState())
        dispatch(createTreeViewCouch())
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        })
        dispatch({
            type: SNACKBAR_ERROR,
            payload: { msg: err?.response?.data?.email[0], type: "info" }
        })

        dispatch(setLoaderFalse());
        dispatch(cleanState())

    }
};


export const forget_password = (email) => async dispatch => {
    const body = JSON.stringify({ email });
    try {
        await Auth.forgetPass(body)
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS
        });
        dispatch({
            type: SNACKBAR_ERROR,
            payload: { msg: "Check your mail", type: "info" }
        })

    } catch (err) {
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: err.message
        })

    }
};


export const forgot_password_confirm = (token, password) => async dispatch => {
    const body = JSON.stringify({ password });
    try {
        await Auth.resetNewPass(token, body)
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: err.message
        });
    }
};

export const logout = () => async dispatch => {
    try {
        await Auth.logout()
        dispatch({
            type: LOGOUT
        });
        dispatch(setLoaderFalse())
    } catch (err) {
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: err.message
        })
        dispatch(setLoaderFalse())
    }
};


export const myFacebookLogin = (accesstoken, path) => async (dispatch) => {
    try {
        const body = {
            access_token: accesstoken,
        }
        let res = await Auth.socialLogin("facebook", path, body)
        await dispatch({ type: FACEBOOK_AUTH_SUCCESS, payload: res.data.key })
        await dispatch(loadUser())
        await dispatch(setLoaderFalse())
    } catch (err) {
        dispatch({ type: FACEBOOK_AUTH_FAIL })
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: err.message
        })
        dispatch(setLoaderFalse())
    }

};

export const myGoogleLogin = (response, path) => async (dispatch) => {
    try {
        const body = {
            access_token: response.accessToken,
        }
        let res = await Auth.socialLogin("google", path, body)
        await dispatch({ type: GOOGLE_AUTH_SUCCESS, payload: res.data.key })
        await dispatch(loadUser())
        await dispatch(setLoaderFalse())
    } catch (err) {
        dispatch({ type: GOOGLE_AUTH_FAIL })
        if (path === "register") {
            dispatch({
                type: ADD_ERROR_SUCCESS,
                payload: err.message
            })
        }
        else {
            dispatch({
                type: SNACKBAR_ERROR,
                payload: { msg: "You must register first", type: "info" }
            })

        }
        dispatch(setLoaderFalse())
    }
};

export const myGithubLogin = (access_token, path) => async (dispatch) => {
    try {
        const body = {
            access_token: access_token,
        }
        let res = await Auth.socialLogin("github", path, body)
        await dispatch({ type: GITHUB_AUTH_SUCCESS, payload: res.data.key })
        await dispatch(loadUser())
        await dispatch(setLoaderFalse())
    } catch (err) {
        dispatch({ type: GITHUB_AUTH_FAIL })
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: err.message
        })
        dispatch(setLoaderFalse())
    }
};

export const emailCheck = async (email) => {
    try {
        let res = await Auth.register({ email })

        return res.data
    } catch {
        return true

    }
}