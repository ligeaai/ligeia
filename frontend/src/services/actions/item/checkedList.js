import {
    LOAD_CHECKLIST,
    SET_CHECKED_ITEMS,
    CLEAN_COMPANY_CHECKED_LIST
} from "../types"
import axios from "axios";

import { instance, config } from '../../baseApi';
import { loadLinks } from "./itemLinkEditor";

import { dateFormatter } from "../../utils/dateFormatter"

let cancelToken;
export const loadCheckedList = (type, inOut) => async (dispatch, getState) => {
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    let res;
    try {
        res = await instance.get(`/item/details/${inOut === "data" ? type.FROM_TYPE : type.TO_TYPE}`,
            { ...config(), cancelToken: cancelToken.token });
        const selectedItemId = getState().treeview.selectedItem.ITEM_ID;
        try {
            let itemLinkRes = await instance.post(
                `/item-link/details/`,
                {
                    ID: selectedItemId,
                },
                config()
            );
            var data = [];
            res.data.map((e) => {
                var temp = true;
                itemLinkRes.data.TO_ITEM_ID.map((a) => {
                    if (e.ITEM_ID === a.FROM_ITEM_ID) {
                        if (type.TYPE === a.LINK_TYPE) {
                            temp = false;
                        }
                    }
                });
                itemLinkRes.data.FROM_ITEM_ID.map((a) => {
                    if (e.ITEM_ID === a.TO_ITEM_ID) {
                        if (type.TYPE === a.LINK_TYPE) {
                            temp = false;
                        }
                    }
                });
                if (temp) {
                    data.push(e);
                }
            });
            dispatch({
                type: LOAD_CHECKLIST,
                payload: data
            })
        } catch (err) {
            var data = [];
            res.data.map((e) => {
                data.push(e);
            });
            dispatch({
                type: LOAD_CHECKLIST,
                payload: data
            })
        }
    } catch {

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

export const cardinalityCheck = (selectItems, selectedItemFromType) => async (dispatch, getState) => {
    const selectedItem = getState().treeview.selectedItem
    const links = getState().itemLinkEditor.links
    const checkedItemLength = getState().checkedList.checkedItems.length
    const checkedItem = getState().checkedList.checkedItems
    var isOut = false
    if (selectItems[0].TO_TYPE === selectedItem.ITEM_TYPE) {
        isOut = true
    }
    var mySelectItem = []
    if (isOut) {
        selectItems.map(e => {
            if (e.FROM_TYPE === selectedItemFromType) {
                mySelectItem = e
            }
        })
    }
    else {
        selectItems.map(e => {
            if (e.TO_TYPE === selectedItemFromType) {
                mySelectItem = e
            }
        })
    }
    if (mySelectItem.TO_CARDINALITY === "*" && mySelectItem.FROM_CARDINALITY === "*")
        return true

    //------ in
    if (isOut && mySelectItem.TO_CARDINALITY === "*" && mySelectItem.FROM_CARDINALITY === "1") {
        let returnVal = true
        if (parseInt(checkedItemLength) > 1) {
            return false
        }
        Object.keys(links).map(e => {
            if (links[e].FROM_ITEM_TYPE === mySelectItem.FROM_TYPE) {
                if (links[e].LINK_TYPE === mySelectItem.TYPE) {
                    returnVal = false
                }

            }
        })
        return returnVal
    }
    if (isOut && mySelectItem.TO_CARDINALITY === "1" && mySelectItem.FROM_CARDINALITY === "*") {
        try {
            if (parseInt(checkedItemLength) > 1) {
                return false
            }
            const TO_ITEM_TYPE = mySelectItem.TO_TYPE
            var returnVal = true
            await Promise.all(
                Object.keys(checkedItem).map(async e => {
                    var FROM_ITEM_ID = checkedItem[e].ITEM_ID
                    const LINK_TYPE = mySelectItem.TYPE
                    const body = JSON.stringify({ TO_ITEM_TYPE, FROM_ITEM_ID, LINK_TYPE })
                    try {
                        let res = await instance.post(
                            `/item-link/cardinalty/`,
                            body,
                            config()
                        );
                        if (res.data) {
                            returnVal = false
                        }
                    } catch { }
                }))
            return returnVal
        } catch (err) {
            console.log(err);
        }
    }
    if (isOut && mySelectItem.TO_CARDINALITY === "1" && mySelectItem.FROM_CARDINALITY === "1") {
        if (parseInt(checkedItemLength) > 1) {
            return false
        }
        var returnVal = true
        Object.keys(links).map(e => {
            if (links[e].FROM_ITEM_TYPE === mySelectItem.FROM_TYPE) {
                if (links[e].LINK_TYPE === mySelectItem.TYPE) {
                    returnVal = false
                }
            }
        })
        if (!returnVal) {
            return returnVal
        }
        const LINK_TYPE = mySelectItem.TYPE
        const TO_ITEM_TYPE = mySelectItem.FROM_TYPE
        var FROM_ITEM_ID = selectedItem.ITEM_ID
        const body = JSON.stringify({ TO_ITEM_TYPE, FROM_ITEM_ID, LINK_TYPE })
        try {
            let res = await instance.post(
                `/item-link/cardinalty/`,
                body,
                config()
            );
            if (res.data) {
                return false
            }
        } catch { }
        await Promise.all(
            Object.keys(checkedItem).map(async e => {
                const TO_ITEM_TYPE = mySelectItem.TO_TYPE
                var FROM_ITEM_ID = checkedItem[e].ITEM_ID
                const body = JSON.stringify({ TO_ITEM_TYPE, FROM_ITEM_ID, LINK_TYPE })
                try {
                    let res = await instance.post(
                        `/item-link/cardinalty/`,
                        body,
                        config()
                    );
                    if (res.data) {
                        returnVal = false
                    }
                } catch { }
            }))
        return returnVal
    }
    //---------out
    if (!isOut && mySelectItem.TO_CARDINALITY === "1" && mySelectItem.FROM_CARDINALITY === "*") {
        var returnVal = true
        await Promise.all(
            Object.keys(checkedItem).map(async e => {
                const LINK_TYPE = mySelectItem.TYPE
                const FROM_ITEM_TYPE = mySelectItem.FROM_TYPE
                var TO_ITEM_ID = checkedItem[e].ITEM_ID
                const body = JSON.stringify({ FROM_ITEM_TYPE, TO_ITEM_ID, LINK_TYPE })
                try {
                    let res = await instance.post(
                        `/item-link/cardinalty/`,
                        body,
                        config()
                    );
                    if (res.data) {
                        returnVal = false
                    }
                } catch { }
            }))
        return returnVal

    }
    if (!isOut && mySelectItem.TO_CARDINALITY === "*" && mySelectItem.FROM_CARDINALITY === "1") {
        let returnVal = true
        if (parseInt(checkedItemLength) > 1) {
            return false
        }
        Object.keys(links).map(e => {
            if (links[e].TO_ITEM_TYPE === mySelectItem.TO_TYPE) {
                if (links[e].LINK_TYPE === mySelectItem.TYPE) {
                    returnVal = false
                }
            }
        })
        return returnVal
    }
    if (!isOut && mySelectItem.TO_CARDINALITY === "1" && mySelectItem.FROM_CARDINALITY === "1") {
        if (parseInt(checkedItemLength) > 1) {
            return false
        }
        Object.keys(links).map(e => {
            if (links[e].TO_ITEM_TYPE === mySelectItem.TO_TYPE) {
                if (links[e].LINK_TYPE === mySelectItem.TYPE) {
                    returnVal = false
                }
            }
        })
        var returnVal = true
        if (!returnVal) {
            return returnVal
        }

        const LINK_TYPE = mySelectItem.TYPE
        const FROM_ITEM_TYPE = mySelectItem.FROM_TYPE
        var TO_ITEM_ID = checkedItem[0].ITEM_ID
        var body = JSON.stringify({ FROM_ITEM_TYPE, TO_ITEM_ID, LINK_TYPE })
        try {
            let res = await instance.post(
                `/item-link/cardinalty/`,
                body,
                config()
            );
            if (res.data) {
                return false
            }
        } catch (err) {
            console.log(err);
        }
        var TO_ITEM_TYPE = selectedItemFromType
        var FROM_ITEM_ID = selectedItem.ITEM_ID
        var body = JSON.stringify({ TO_ITEM_TYPE, FROM_ITEM_ID, LINK_TYPE })
        try {
            let res = await instance.post(
                `/item-link/cardinalty/`,
                body,
                config()
            );
            if (res.data) {
                returnVal = false
            }
        } catch { }

        return returnVal
    }
    return true
}

export const saveLinks = (date, linkType, isOutCheck) => async (dispatch, getState) => {
    const checkedItems = getState().checkedList.checkedItems
    const selectedItem = getState().treeview.selectedItem

    const saveFunc = async () => {
        checkedItems.map(async (e) => {
            var isOut = false
            if (isOutCheck === selectedItem.ITEM_TYPE) {
                isOut = true
            }
            const linkUuid = _uuidv4();
            const rowUuid = _uuidv4();
            const body = JSON.stringify({
                LINK_ID: linkUuid.replace(/-/g, ""),
                LINK_TYPE: linkType,
                START_DATETIME: dateFormatter(date),
                END_DATETIME: "9000-1-1",
                FROM_ITEM_ID: isOut ? e.ITEM_ID : selectedItem.ITEM_ID,
                FROM_ITEM_TYPE: isOut ? e.ITEM_TYPE : selectedItem.ITEM_TYPE,
                TO_ITEM_ID: isOut ? selectedItem.ITEM_ID : e.ITEM_ID,
                TO_ITEM_TYPE: isOut ? selectedItem.ITEM_TYPE : e.ITEM_TYPE,
                ROW_ID: rowUuid.replace(/-/g, ""),
            });
            try {
                let res = await instance.post(
                    `/item-link/save/`,
                    body,
                    config()
                );
                dispatch(loadLinks());
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


