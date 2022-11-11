import {
    LOAD_LINK_EDITOR,
    LOAD_LINKS
} from "../types"

import { instance, config } from '../../baseApi';


export const loadLinkEditor = () => async (dispatch, getState) => {
    const TO_TYPE = getState().item.type
    const CULTURE = getState().lang.cultur
    const selectedItem = getState().item.selectedItem.ITEM_ID
    const body = JSON.stringify({ TO_TYPE, CULTURE })
    try {
        let res = await instance.post(
            "/type-link/details/",
            body,
            config
        );
        try {
            let itemLinkRes = await instance.post(
                `/item-link/details/`,
                {
                    TO_ITEM_ID: selectedItem,
                },
                config
            );

            dispatch({
                type: LOAD_LINKS,
                payload: itemLinkRes.data
            })
        } catch {
            dispatch({
                type: LOAD_LINKS,
                payload: []
            })
        }
        dispatch({
            type: LOAD_LINK_EDITOR,
            payload: res.data
        })

    } catch {

    }


}


