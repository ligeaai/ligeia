import {
    TOGGLE_ALARMS,
    SET_ALARMS_ITEM
} from '../../actions/types';

const initialState = {
    isOpen: false,
    alarmsItem: []
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case TOGGLE_ALARMS:
            return {
                ...state,
                isOpen: payload
            }
        case SET_ALARMS_ITEM:
            return {
                ...state,
                alarmsItem: payload
            }
        default:
            return state
    }
};
