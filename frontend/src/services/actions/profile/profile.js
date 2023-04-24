import {
    LOAD_PROFILE,
    CLEAN_PROFILE
} from "../types"
import Auth from "../../api/auth"
export const loadProfile = () => async (dispatch) => {
    try {
        let res = await Auth.get()
        console.log(res.data);
        dispatch({
            type: LOAD_PROFILE,
            payload: res.data
        })
    } catch {

    }
}
export const cleanProfile = () => disppatch => {
    disppatch({
        type: CLEAN_PROFILE,

    })
}


