import {
    LOAD_PROFILE,
    CLEAN_PROFILE
} from "../types"
import Auth from "../../api/auth"
import { loadUser } from "../auth"
export const loadProfile = () => async (dispatch) => {
    try {
        let res = await Auth.get()
        dispatch({
            type: LOAD_PROFILE,
            payload: res.data
        })
    } catch {
    }
}

export const updateUserInfo = (user) => async (dispatch) => {
    try {
        let res = await Auth.profileUpdate(user)
        console.log(res);
        dispatch(loadProfile())
        dispatch(loadUser())
    } catch (err) {
        console.log(err);
    }
}

export const cleanProfile = () => disppatch => {
    disppatch({
        type: CLEAN_PROFILE,

    })
}

export const changePassword = async (body) => {
    try {
        let res = await Auth.updatePassword(body)

    } catch (err) {
        console.log(err);
    }
}
