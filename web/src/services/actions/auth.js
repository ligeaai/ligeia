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

// export const load_user = () => async dispatch => {
//     if (localStorage.getItem('access')) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `JWT ${localStorage.getItem('access')}`,
//                 'Accept': 'application/json'
//             }
//         };

//         try {
//             const res = await axios.get(`http://localhost:8000/en/api/v1/...`, config);

//             dispatch({
//                 type: USER_LOADED_SUCCESS,
//                 payload: res.data
//             });
//         } catch (err) {
//             dispatch({
//                 type: USER_LOADED_FAIL
//             });
//         }
//     } else {
//         dispatch({
//             type: USER_LOADED_FAIL
//         });
//     }
// };

// export const googleAuthenticate = (state, code) => async dispatch => {
//     if (state && code && !localStorage.getItem('access')) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         };

//         const details = {
//             'state': state,
//             'code': code
//         };

//         const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

//         try {
//             const res = await axios.post(`http://localhost:8000/en/api/v1/.../?${formBody}`, config);

//             dispatch({
//                 type: GOOGLE_AUTH_SUCCESS,
//                 payload: res.data
//             });

//             dispatch(load_user());
//         } catch (err) {
//             dispatch({
//                 type: GOOGLE_AUTH_FAIL
//             });
//         }
//     }
// };

// export const facebookAuthenticate = (state, code) => async dispatch => {
//     if (state && code && !localStorage.getItem('access')) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         };

//         const details = {
//             'state': state,
//             'code': code
//         };

//         const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

//         try {
//             const res = await axios.post(`http://localhost:8000/en/api/v1/.../?${formBody}`, config);

//             dispatch({
//                 type: FACEBOOK_AUTH_SUCCESS,
//                 payload: res.data
//             });

//             dispatch(load_user());
//         } catch (err) {
//             dispatch({
//                 type: FACEBOOK_AUTH_FAIL
//             });
//         }
//     }
// };

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
            payload: res.data
        });
        dispatch(setLoaderFalse());
        //dispatch(load_user());
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

    const body = JSON.stringify({ email, first_name, last_name, password });

    try {
        const res = await axios.post(`http://localhost:8000/api/v1/auth/register/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
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
        return err;
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

export const change_password = (new_password1, new_password2, old_password) => async dispatch => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    const body = JSON.stringify({
        new_password1,
        new_password2,
        old_password
    });
    try {
        await axios.patch(`http://localhost:8000/api/v1/auth/change-password/`, body, config);
        await axios.post(`http://localhost:8000/api/v1/auth/logout/`, body, config);
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: CHANGE_PASSWORD_FAIL
        });
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: err.message
        })
        setTimeout(() => {
            dispatch({
                type: CLEAN_ERROR_SUCCESS,
            })
        }, 3000)
        return err;
    }
};

export const reset_password = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const body = JSON.stringify({
        email,
        password
    });
    try {
        await axios.post(`http://localhost:8000/api/v1/auth/reset-password`, body, config);
        dispatch({
            type: CHANGE_PASSWORD_SUCCESS
        });

    } catch (err) {
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: err.message
        })
        setTimeout(() => {
            dispatch({
                type: CLEAN_ERROR_SUCCESS,
            })
        }, 3000)
        return err;
    }
};

//PUT http://127.0.0.1:8000/api/v1/auth/change-password/ 403 (Forbidden)


// export const reset_password = (email) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };

//     const body = JSON.stringify({ email });

//     try {
//         await axios.post(`http://localhost:8000/en/api/v1/...`, body, config);

//         dispatch({
//             type: PASSWORD_RESET_SUCCESS
//         });
//     } catch (err) {
//         dispatch({
//             type: PASSWORD_RESET_FAIL
//         });
//     }
// };

// export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };

//     const body = JSON.stringify({ uid, token, new_password, re_new_password });

//     try {
//         await axios.post(`http://localhost:8000/en/api/v1/...`, body, config);

//         dispatch({
//             type: PASSWORD_RESET_CONFIRM_SUCCESS
//         });
//     } catch (err) {
//         dispatch({
//             type: PASSWORD_RESET_CONFIRM_FAIL
//         });
//     }
// };

export const logout = () => async dispatch => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    const body = JSON.stringify({ token: localStorage.getItem('token') });
    try {
        await axios.post(`http://localhost:8000/api/v1/auth/logout/`, body, config);

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
