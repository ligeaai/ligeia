import {
    SET_ALARM_HISTORY_DIAGNOSTIC,
    SET_COMMUNICATIONS_STATUS_DIAGNOSTIC,
    SET_SYSTEM_HEALTH_DIAGNOSTIC,
    CLEAN_DIAGNOSTIC
} from "../../actions/types"

const initialState = {
    alarmHistory: {
        column: {},
        row: {}
    },
    communicationsStatus: {
        column: {},
        row: {}
    },
    systemHealth: {
        column: {},
        row: {}
    },
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case SET_ALARM_HISTORY_DIAGNOSTIC:
            return {
                ...state,
                alarmHistory: {
                    column: payload.column,
                    row: payload.row
                }
            }
        case SET_COMMUNICATIONS_STATUS_DIAGNOSTIC:
            return {
                ...state,
                alarmHistory: {
                    column: payload.column,
                    row: payload.row
                }
            }
        case SET_SYSTEM_HEALTH_DIAGNOSTIC:
            return {
                ...state,
                alarmHistory: {
                    column: payload.column,
                    row: payload.row
                }
            }
        case CLEAN_DIAGNOSTIC:
            return {
                alarmHistory: {
                    column: {},
                    row: {}
                },
                communicationsStatus: {
                    column: {},
                    row: {}
                },
                systemHealth: {
                    column: {},
                    row: {}
                },
            }
        default:
            return {
                ...state,
            }
    }
};

