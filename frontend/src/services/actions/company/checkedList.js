import {
    LOAD_CHECKLIST,
    SET_CHECKED_ITEMS,
    CLEAN_COMPANY_CHECKED_LIST
} from "../types"

import { instance, config } from '../../baseApi';
import { loadLinkEditor } from "./linkEditor";

export const loadCheckedList = (fromType) => async (dispatch, getState) => {
    let res = await instance.get(`/item/details/${fromType}`, config);
    const selectedItemId = getState().item.selectedItem.ITEM_ID;
    try {
        let itemLinkRes = await instance.post(
            `/item-link/details/`,
            {
                TO_ITEM_ID: selectedItemId,
            },
            config
        );
        var data = [];
        res.data.map((e) => {
            console.log(e);
            var temp = true;
            itemLinkRes.data.map((a) => {

                if (e.ITEM_ID === a.FROM_ITEM_ID) {
                    temp = false;
                }
            });
            if (temp) {
                data.push(e);
            }
        });
        console.log(data);
        dispatch({
            type: LOAD_CHECKLIST,
            payload: data
        })
    } catch (err) {
        var data = [];
        res.data.map((e) => {
            data.push(e);
        });
        console.log(data);
        dispatch({
            type: LOAD_CHECKLIST,
            payload: data
        })
    }
}

export const toggleChecked = (data) => async (dispatch) => {
    dispatch({
        type: SET_CHECKED_ITEMS,
        payload: data
    })
}

function _uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
        /[018]/g,
        (c) =>
            (
                c ^
                (crypto.getRandomValues(new Uint8Array(1))[0] &
                    (15 >> (c / 4)))
            ).toString(16)
    );
}
export const saveLinks = (date, linkType, isOutCheck) => async (dispatch, getState) => {
    const checkedItems = getState().companyCheckedList.checkedItems
    const selectedItem = getState().item.selectedItem

    const saveFunc = async () => {
        checkedItems.map(async (e) => {
            var isOut = false
            if (isOutCheck === selectedItem.ITEM_TYPE) {
                isOut = true
            }
            var d = date.getDate();
            var m = date.getMonth();
            m += 1;
            var y = date.getFullYear();
            var newdate = y + "-" + m + "-" + d;
            const linkUuid = _uuidv4();
            const rowUuid = _uuidv4();
            const body = JSON.stringify({
                LINK_ID: linkUuid.replace(/-/g, ""),
                LINK_TYPE: linkType,
                START_DATETIME: newdate,
                END_DATETIME: "9000-1-1",
                FROM_ITEM_ID: isOut ? e.ITEM_ID : selectedItem.ITEM_ID,
                FROM_ITEM_TYPE: isOut ? e.ITEM_TYPE : selectedItem.ITEM_TYPE,
                TO_ITEM_ID: isOut ? selectedItem.ITEM_ID : e.ITEM_ID,
                TO_ITEM_TYPE: isOut ? selectedItem.ITEM_TYPE : e.ITEM_TYPE,
                ROW_ID: rowUuid.replace(/-/g, ""),
            });
            console.log(body);
            try {
                let res = await instance.post(
                    `/item-link/save/`,
                    body,
                    config
                );
                dispatch(loadLinkEditor());
            } catch (err) { }
        });
        dispatch(cleanCompanyCheckedList());
    };
    dispatch({
        type: "confirmation/setConfirmation",
        payload: {
            title: "Are you sure you want to save?",
            body: <>{checkedItems.map((e) => e.NAME)}</>,
            agreefunction: saveFunc,
        },
    });
}


export const cleanCompanyCheckedList = () => dispatch => {
    dispatch({
        type: CLEAN_COMPANY_CHECKED_LIST
    })
}


