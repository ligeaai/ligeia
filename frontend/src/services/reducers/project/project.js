import {
    CHANGE_VALUE_PROJECT,
    CLEAN_VALUE_PROJECT
} from "../../actions/types"



const initialState = {
    DATA_SOURCE: "Postgre Sql",
    CONNECTION_STRING: "",
    DATABASE_CREATE_FILE: "",
    IMPLEMENTATION_NAME: "",
    CULTURES: [],
    LAYERS: [],
    UNIT_SYSTEM: "",

};



export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case CHANGE_VALUE_PROJECT:
            return {
                ...state,
                [payload.key]: payload.value
            }
        case CLEAN_VALUE_PROJECT:
            return {
                ...initialState
            }
        default:
            return {
                ...state,
            }
    }
};
