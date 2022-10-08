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
    CLEAN_ERROR_SUCCESS
} from './types';

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
            const res = await axios.get(`http://localhost:8000/api/v1/auth/user-detail`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
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

// export const checkAuthenticated = () => async dispatch => {
//     if (localStorage.getItem('access')) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         };

//         const body = JSON.stringify({ token: localStorage.getItem('access') });

//         try {
//             const res = await axios.post(`http://localhost:8000/en/api/v1/...`, body, config)

//             if (res.data.code !== 'token_not_valid') {
//                 dispatch({
//                     type: AUTHENTICATED_SUCCESS
//                 });
//             } else {
//                 dispatch({
//                     type: AUTHENTICATED_FAIL
//                 });
//             }
//         } catch (err) {
//             dispatch({
//                 type: AUTHENTICATED_FAIL
//             });
//         }

//     } else {
//         dispatch({
//             type: AUTHENTICATED_FAIL
//         });
//     }
// };

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`http://localhost:8000/api/v1/auth/login/`, body, config);
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
            payload: err.message
        })
        dispatch(setLoaderFalse());
        setTimeout(() => {
            dispatch({
                type: CLEAN_ERROR_SUCCESS,
            })
        }, 3000)
    }
};

export const signup = (email, first_name, last_name, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(email, first_name, last_name, password);
    const body = JSON.stringify({ email, first_name, last_name, password });

    try {
        const res = await axios.post(`http://localhost:8000/api/v1/auth/register/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data.token
        });
        dispatch(loadUser());
        dispatch(setLoaderFalse());
        dispatch(cleanState())
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
        setTimeout(() => {
            dispatch({
                type: CLEAN_ERROR_SUCCESS,
            })
        }, 3000)
    }
};

// export const verify = (uid, token) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };

//     const body = JSON.stringify({ uid, token });

//     try {
//         await axios.post(`http://localhost:8000/en/api/v1/...`, body, config);

//         dispatch({
//             type: ACTIVATION_SUCCESS,
//         });
//     } catch (err) {
//         dispatch({
//             type: ACTIVATION_FAIL
//         })
//     }
// };

// export const change_password = (new_password1, new_password2, old_password) => async dispatch => {
//     let token = localStorage.getItem('token');
//     const config = {
//         headers: {
//             'Content-Type': 'application/json',
//             "Authorization": `token ${token}`,
//         }
//     };
//     const body = JSON.stringify({
//         new_password1,
//         new_password2,
//         old_password
//     });
//     try {
//         await axios.patch(`http://localhost:8000/api/v1/auth/change-password/`, body, config);
//         await axios.post(`http://localhost:8000/api/v1/auth/logout/`, body, config);
//         dispatch({
//             type: CHANGE_PASSWORD_SUCCESS
//         });
//     } catch (err) {
//         dispatch({
//             type: CHANGE_PASSWORD_FAIL
//         });
//         dispatch({
//             type: ADD_ERROR_SUCCESS,
//             payload: err.message
//         })
//         setTimeout(() => {
//             dispatch({
//                 type: CLEAN_ERROR_SUCCESS,
//             })
//         }, 3000)
//     }
// };

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
        await axios.post(`http://localhost:8000/api/v1/auth/Forget-password/`, body, config);
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS
        });
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: "Check your mail"
        })
        dispatch(setLoaderFalse())

    } catch (err) {
        dispatch(setLoaderFalse())
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: err.message
        })
        setTimeout(() => {
            dispatch({
                type: CLEAN_ERROR_SUCCESS,
            })
        }, 3000)
    }
};


export const forgot_password_confirm = (token, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ password });
    console.log(token);
    console.log(body);
    try {
        await axios.post(`http://localhost:8000/api/v1/auth/reset-new-password/${token}/`, body, config);

        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
        dispatch(setLoaderFalse())
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
        dispatch(setLoaderFalse());
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
        await axios.get(`http://localhost:8000/api/v1/auth/logout/`, config);
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
        setTimeout(() => {
            dispatch({
                type: CLEAN_ERROR_SUCCESS,
            })
        }, 3000)
    }
};


export const myFacebookLogin = (accesstoken) => async (dispatch) => {
    try {
        let res = await axios.post(
            "http://localhost:8000/api/v1/auth/facebook/",
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

export const myGoogleLogin = (response) => async (dispatch) => {
    try {
        let res = await axios.post(
            "http://localhost:8000/api/v1/auth/google/",
            {
                access_token: response.accessToken,
            }
        );
        await dispatch({ type: GOOGLE_AUTH_SUCCESS, payload: res.data.key })
        await dispatch(loadUser())
        await dispatch(setLoaderFalse())
    } catch (err) {
        dispatch({ type: GOOGLE_AUTH_FAIL })
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: err.message
        })
        dispatch(setLoaderFalse())
    }
};

export const myGithubLogin = (access_token) => async (dispatch) => {
    console.log(access_token);
    try {
        let res = await axios.post(
            "http://localhost:8000/auth/github/",
            {
                access_token: access_token,
            }
        );
        console.log(res);
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