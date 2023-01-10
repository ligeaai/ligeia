import axios from 'axios';
import { cleanState } from '../reducers/registerFormReducer';
import { setLoaderFalse } from './loader';
import {
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    GITHUB_AUTH_SUCCESS,
    GITHUB_AUTH_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    LOGOUT,
    ADD_ERROR_SUCCESS,
} from './types';

import { instance } from '../baseApi';
import { createTreeViewCouch } from './treeview/treeview';
export const loadUser = () => async dispatch => {
    if (localStorage.getItem('token')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await instance.get(`/auth/user-detail`, config);
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
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await instance.post(`/auth/login/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        });
        dispatch(setLoaderFalse());
        dispatch(loadUser());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: "Username or password is incorrect"
        })
        dispatch(setLoaderFalse());

    }
};

export const signup = (email, first_name, last_name, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ email, first_name, last_name, password });

    try {
        const res = await instance.post(`/auth/register/`, body, config);
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
            type: ADD_ERROR_SUCCESS,
            payload: err.message
        })
        dispatch(setLoaderFalse());
        dispatch(cleanState())

    }
};


export const forget_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({
        email,
    });
    try {
        await instance.post(`/auth/Forget-password/`, body, config);
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS
        });
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: "Check your mail"
        })
    } catch (err) {
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: err.message
        })

    }
};


export const forgot_password_confirm = (token, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ password });
    try {
        await instance.post(`/auth/reset-new-password/${token}/`, body, config);

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
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    try {
        await instance.get(`/auth/logout/`, config);
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
        let res = await instance.post(
            `/auth/facebook/${path}`,
            {
                access_token: accesstoken,
            }
        );
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
        let res = await instance.post(
            `/auth/google/${path}`,
            {
                access_token: response.accessToken,
            }
        );
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
                type: ADD_ERROR_SUCCESS,
                payload: "You must register first"
            })
        }
        dispatch(setLoaderFalse())
    }
};

export const myGithubLogin = (access_token, path) => async (dispatch) => {
    try {
        let res = await instance.post(
            `/auth/github/${path}`,
            {
                access_token: access_token,
            }
        );
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