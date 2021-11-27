import { combineReducers } from "redux";


import customizationReducer from "./customizationReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({

    customization: customizationReducer,
    auth: authReducer
});

export default rootReducer