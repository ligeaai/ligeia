<<<<<<< HEAD
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from './messageReducer'
import customizationReducer from "./customizationReducer";
import companiesReducer from './companiesReducer'

const rootReducer = combineReducers({

    customization: customizationReducer,
    messageReducer,
    companiesReducer,
    authReducer
});

=======
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import messageReducer from './message'
import customizationReducer from "./customizationReducer";
import companiesReducer from './companiesReducer'

const rootReducer = combineReducers({

    customization: customizationReducer,
    messageReducer,
    companiesReducer,
    authReducer
});

>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
export default rootReducer