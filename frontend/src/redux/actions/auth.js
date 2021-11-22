// import axios from "axios";
// import { notificationToast } from "./messages";
// // import bottomRightNotificationToast is you want to change toast notification position

// import {
//     USER_LOADED,
//     USER_LOADING,
//     LOGIN_SUCCESS,
//     REGISTER_SUCCESS,
//     REGISTER_FAIL,
//     GET_SITES,
//     GET_WELLS,
//     GET_DEVICES,
//     WELL_SELECTED,
//     FILL_WELL_DATA,
//     LOGOUT_SUCCESS,
//     TOKEN_EXIPRED,
// } from "./types";

// import { getAPIURL } from '../utils/setURL.js';


// // CHECK TOKEN & LOAD USER
// export const loadUser = () => (dispatch, getState) => {
//     // User Loading
//     dispatch({ type: USER_LOADING });

//     axios
//         .get(getAPIURL() + "user-details/", tokenConfig(getState))
//         .then(res => {
//             dispatch({
//                 type: USER_LOADED,
//                 payload: res.data
//             });
//         })
//         .catch(err => {
//             notificationToast("Your authentication token has expired please try logging in again!", "error")
//             dispatch({ type: TOKEN_EXIPRED })
//         });
// };


// export const checkTokenExpired = () => (dispatch, getState) => {
//     alert("request started")
//     axios
//         .get(getAPIURL() + "user-details/", tokenConfig(getState))
//         .then(res => {
//             alert("request success");
//             return true;
//         })
//         .catch(err => {
//             localStorage.clear();
//             alert("request fail");
//             return false;
//         });
// }

// export const setWell = (wellId, wellLat, wellLong) => (dispatch, getState) => {
//     const well_data = {
//         'well_id': wellId,
//         'well_latitude': wellLat,
//         'well_longitude': wellLong,
//     }
//     dispatch({ type: WELL_SELECTED, payload: well_data });
// }

// export const fillWellData = (data) => (dispatch, getState) => {
//     dispatch({ type: FILL_WELL_DATA, payload: data });
// }

// // LOGIN USER
// export const login = (username, password) => dispatch => {
//     // Headers
//     const config = {
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };

//     // Request Body
//     const body = JSON.stringify({ username, password });

//     axios
//         .post(getAPIURL() + "get-auth-token/", body, config)
//         .then(res => {
//             notificationToast("You have been logged in successfully!", "success")
//             dispatch({
//                 type: LOGIN_SUCCESS,
//                 payload: res.data
//             });
//         })
//         .catch(err => {
//             notificationToast("User credentials are invalid", "error");
//             // returnErrors("User credentials are invalid!", "Authentication Failed");
//         });
// };

// // REGISTER USER
// export const register = ({ username, password, email }) => dispatch => {
//     // Headers
//     const config = {
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };

//     // Request Body
//     const body = JSON.stringify({ username, email, password });

//     axios
//         .post("/api/auth/register", body, config)
//         .then(res => {
//             dispatch({
//                 type: REGISTER_SUCCESS,
//                 payload: res.data
//             });
//         })
//         .catch(err => {
//             notificationToast("Something went wrong please try again", "error")
//             dispatch({
//                 type: REGISTER_FAIL
//             });
//         });
// };

// // LOGOUT USER
// export const logout = () => (dispatch, getState) => {
//     axios
//         .post(getAPIURL() + "knox-logout/", null, tokenConfig(getState))
//         .then(res => {
//             dispatch({ type: LOGOUT_SUCCESS })
//             window.location.href = '/';
//         })
//         .catch(err => {
//             notificationToast("Unable to logout please try again", "error")
//         });
// };

// export const getSites = () => (dispatch, getState) => {
//     axios
//         .get(getAPIURL() + 'sites/', tokenConfig(getState))
//         .then(res => {
//             dispatch({
//                 type: GET_SITES,
//                 payload: res.data,
//             });
//         })
//         .catch(err => {
//             notificationToast("Your authentication token has expired please try logging in again!", "error")
//             dispatch({ type: TOKEN_EXIPRED })
//         })
// };

// export const getWells = () => (dispatch, getState) => {
//     axios
//         .get(getAPIURL() + 'wells/', tokenConfig(getState))
//         .then(res => {
//             dispatch({
//                 type: GET_WELLS,
//                 payload: res.data,
//             });
//         })
//         .catch(err => {
//             notificationToast("Your authentication token has expired please try logging in again!", "error")
//             dispatch({ type: TOKEN_EXIPRED })
//         })
// };

// export const getDevices = () => (dispatch, getState) => {
//     axios
//         .get(getAPIURL() + 'devices/', tokenConfig(getState))
//         .then(res => {
//             dispatch({
//                 type: GET_DEVICES,
//                 payload: res.data,
//             });
//         })
//         .catch(err => {
//             notificationToast("Your authentication token has expired please try logging in again!", "error")
//             dispatch({ type: TOKEN_EXIPRED })
//         })
// };

// // Setup config with token - helper function
// export const tokenConfig = getState => {
//     // Get token from state
//     const token = localStorage.getItem('token');

//     // Headers
//     const config = {
//         headers: {
//             "Content-Type": "application/json"
//         }
//     };

//     // If token, add to headers config
//     if (token) {
//         config.headers["Authorization"] = `Token ${token}`;
//     }

//     return config;
// };
