import {
    SET_CHART_TYPE_OVERVIEW
} from "../types"

import axios from "axios";
import { instance, config } from '../../baseApi';

let cancelToken;

export const changeChartType = (chartType) => (dispatch) => {
    dispatch({
        type: SET_CHART_TYPE_OVERVIEW,
        payload: chartType
    })
}

export const loadChartData = () => dispatch => {



}


