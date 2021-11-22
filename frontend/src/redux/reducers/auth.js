// import {
//     USER_LOADED,
//     USER_LOADING,
//     AUTH_ERROR,
//     LOGIN_SUCCESS,
//     LOGIN_FAIL,
//     LOGOUT_SUCCESS,
//     REGISTER_SUCCESS,
//     REGISTER_FAIL,
//     GET_SITES,
//     GET_WELLS,
//     GET_DEVICES,
//     WELL_SELECTED,
//     FILL_WELL_DATA,
//     REMOVE_WELL
// } from "../actions/types";
// import store from '../store'


// const initialState = {
//     token: localStorage.getItem("token"),
//     isAuthenticated: null,
//     isLoading: false,
//     user: null,
//     wells: null,
//     sites: null,
//     devices: null,
//     markers: [],
//     well_selected: null,
//     well_selected_long: null,
//     well_selected_lat: null,
//     well_selected_id: null,
//     well_latitude_longitude: null,
//     well_selected_name: null,
//     well_selected_site: null,
//     well_selected_bush_number: null,
// };


// export default function (state = initialState, action) {
//     switch (action.type) {
//         case USER_LOADING:
//             return {
//                 ...state,
//                 isLoading: true
//             };
//         case USER_LOADED:
//             localStorage.setItem('isAuthenticated', true);
//             return {
//                 ...state,
//                 isAuthenticated: true,
//                 isLoading: false,
//                 user: action.payload
//             };
//         case LOGIN_SUCCESS:
//             localStorage.setItem('isAuthenticated', true);
//             localStorage.setItem('token', action.payload.token);
//             return {
//                 ...state,
//                 ...action.payload,
//                 isAuthenticated: true,
//                 isLoading: false,
//             };
//         case REGISTER_SUCCESS:
//             return {
//                 ...state,
//                 ...action.payload,
//                 isAuthenticated: true,
//                 isLoading: false
//             };
//         case AUTH_ERROR:
//         case LOGIN_FAIL:
//         case LOGOUT_SUCCESS:
//             localStorage.removeItem('isAuthenticated');
//             return {
//                 ...state
//             }
//         case REGISTER_FAIL:
//             return {
//                 ...state,
//                 token: null,
//                 user: null,
//                 isAuthenticated: false,
//                 isLoading: false
//             };
//         case GET_WELLS:
//             return {
//                 ...state,
//                 wells: action.payload
//             };
//         case GET_DEVICES:
//             return {
//                 ...state,
//                 devices: action.payload
//             };
//         case GET_SITES:
//             return {
//                 ...state,
//                 sites: action.payload
//             };
//         case WELL_SELECTED:
//             return {
//                 ...state,
//                 markers: [...state.markers, action.payload]
//             }
//         case FILL_WELL_DATA:
//             return {
//                 ...state,
//                 well_selected_name: action.data.name,
//                 well_selected_site: action.data.site.name,
//                 well_selected_bush_number: action.data.bush_number,
//             };
//         case REMOVE_WELL:
//             let result = state.markers.filter(marker => marker.latitude !== action.payload.latitude)
//             return {
//                 ...state,
//                 markers: result
//             }
//         default:
//             return state;
//     }
// }
