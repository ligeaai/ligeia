import {
    SET_CHART_TYPE_OVERVIEW
} from "../../actions/types"



const initialState = {
    chartType: "spline"
};



export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case SET_CHART_TYPE_OVERVIEW:
            return {
                ...state,
                chartType: payload
            }
        default:
            return {
                ...state,
            }
    }
};
