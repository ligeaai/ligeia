import { combineReducers } from "redux";
import auth from './authReducer'
import message from './message'

import customizationReducer from "./customizationReducer";

const rootReducer = combineReducers({

    customization: customizationReducer,
    message,
    auth
});

export default rootReducer