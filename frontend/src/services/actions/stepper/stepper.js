import {
    FILL_STEPPER_MANDATORY
} from "../types"


export const fillMandatory = (payload) => dispatch => {
    dispatch({
        type: FILL_STEPPER_MANDATORY,
        payload: payload
    })
}

export const checkMandatory = (index) => (dispatch, getState) => {
    const highchartProps = getState().overviewDialog.highchartProps
    const mandatory = getState().stepper.isMandatoryFields[index]
    let returnVal = true
    console.log(highchartProps);
    console.log(mandatory);
    mandatory.map(e => {
        console.log(e);

        if (highchartProps[e].length === 0) {
            returnVal = false
        }
    }

    )
    return returnVal
}