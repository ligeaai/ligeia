import { combineReducers } from "redux";

import { loginReducer } from '../reducers/loginReducer';

import customizationReducer from "./customizationReducer";

const rootReducer = combineReducers({
    
    customization: customizationReducer,
    auth: loginReducer
});

export default rootReducer