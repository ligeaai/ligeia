import React from "react";
import {
    SAVE_ITEM,
    ADD_ITEM_TYPE,
    LOAD_TREEVIEW_ITEM,
    SET_SELECTED_ITEM,
    CLEAN_DATA_GRID,
    IS_CHANGED_HANDLER,
    ADD_ROW,
    ADD_COLUMN,
    ADD_ERROR_SUCCESS,
    SET_LOADING,
    CLEAN_ALL_TREEMENU
} from "../types"
import axios from "axios";

import { addColum } from "./datagrid"
import { MyTextField } from "../../../pages/main/configuration/organization/myTextField";
import { loadRows } from "./datagrid";
import ConfirmDataGrid from "../../../pages/main/configuration/organization/dataGrid/confirmDataGrid";
import { instance, config } from '../../baseApi';
import history from "../../../routers/history";

import { uuidv4 } from "../../utils/uuidGenerator";
import { dateFormatter } from "../../utils/dateFormatter";

export const showItem = () => async (dispatch, getState) => {
    const type = getState().item.type.toLowerCase()

    try {
        let res = await instance
            .get(
                `/item/details/${type}`,
                config()
            )

        dispatch({
            type: LOAD_TREEVIEW_ITEM,
            payload: res.data.sort((a, b) =>
                a.NAME > b.NAME ? 1 : -1
            )
        });
        dispatch(selectItem(getState().item.selectedItem.selectedIndex))
        return res
    } catch (err) {
        dispatch({
            type: LOAD_TREEVIEW_ITEM,
            payload: []
        });
        return err
    }
}
export const saveItem = () => async (dispatch, getState) => {
    if (dispatch(checkMandatoryFields())) {
        const uuid = uuidv4()
        var COLUMNS = []
        var ITEM = {}
        Object.keys(getState().companyDataGrid.columns).map(async (a, i) => {
            if (i > 3) {
                var newdate = dateFormatter(getState().companyDataGrid.rows.HISTORY[a]);
                COLUMNS.push({
                    "START_TIME": newdate,
                })
                Object.keys(getState().companyDataGrid.rows).map((e) => {
                    //&& getState().companyDataGrid.rows[e][a] === null && getState().companyDataGrid.rows[e][a] === ""
                    if (e !== "HISTORY") {
                        var propsRowUuid = uuidv4()
                        if (getState().companyDataGrid.rows[e].PROPERTY_TYPE === "NUMBER" || getState().companyDataGrid.rows[e].PROPERTY_TYPE === "INT") {
                            COLUMNS[i - 4] = {
                                ...COLUMNS[i - 4],
                                [getState().companyDataGrid.rows[e].PROPERTY_NAME]: {
                                    "VALUE": parseInt(getState().companyDataGrid.rows[e][a]),
                                    "VALUE_TYPE": getState().companyDataGrid.rows[e].PROPERTY_TYPE,
                                    "ROW_ID": propsRowUuid.replace(/-/g, "")
                                }

                            }
                        }
                        else if (getState().companyDataGrid.rows[e].PROPERTY_TYPE === "BOOL") {
                            COLUMNS[i - 4] = {
                                ...COLUMNS[i - 4],
                                [getState().companyDataGrid.rows[e].PROPERTY_NAME]: {
                                    "VALUE": getState().companyDataGrid.rows[e][a] ? "True" : "False",
                                    "VALUE_TYPE": getState().companyDataGrid.rows[e].PROPERTY_TYPE,
                                    "ROW_ID": propsRowUuid.replace(/-/g, "")
                                }
                            }
                        }
                        else if (getState().companyDataGrid.rows[e].PROPERTY_TYPE === "CODE") {
                            COLUMNS[i - 4] = {
                                ...COLUMNS[i - 4],
                                [getState().companyDataGrid.rows[e].PROPERTY_NAME]: {
                                    "VALUE": getState().companyDataGrid.rows[e][a],
                                    "VALUE_TYPE": getState().companyDataGrid.rows[e].PROPERTY_TYPE,
                                    "ROW_ID": propsRowUuid.replace(/-/g, "")
                                }
                            }
                        }
                        else {
                            COLUMNS[i - 4] = {
                                ...COLUMNS[i - 4],
                                [getState().companyDataGrid.rows[e].PROPERTY_NAME]: {
                                    "VALUE": getState().companyDataGrid.rows[e][a],
                                    "VALUE_TYPE": getState().companyDataGrid.rows[e].PROPERTY_TYPE,
                                    "ROW_ID": propsRowUuid.replace(/-/g, "")
                                }
                            }
                        }
                    }
                })

                var rowUuid = uuidv4()
                ITEM = {
                    "ITEM_ID": getState().item.selectedItem.ITEM_ID ? getState().item.selectedItem.ITEM_ID : uuid.replace(/-/g, ""),
                    "ITEM_TYPE": getState().item.type,
                    "LAST_UPDT_USER": getState().auth.user.email,
                    "ROW_ID": getState().item.selectedItem.ROW_ID ? getState().item.selectedItem.ROW_ID : rowUuid.replace(/-/g, "")
                }


            }
        })
        const body = JSON.stringify({ ITEM, COLUMNS });
        console.log(body);
        try {
            let res = await instance
                .post(
                    "/item/item-and-property/",
                    body,
                    config()
                )
            dispatch({
                type: SAVE_ITEM,
            });
            dispatch(showItem())
            dispatch({
                type: IS_CHANGED_HANDLER,
                payload: false
            })
            return res
        } catch (err) {
            return err
        }
    }
    else {
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: "You must fill in the mandatory fields"
        })
    }
}

export const saveNewItem = () => async (dispatch, getState) => {
    const field = getState().companyDataGrid.columns[Object.keys(getState().companyDataGrid.columns)[Object.keys(getState().companyDataGrid.columns).length - 1]].field
    const temp = getState().companyDataGrid.rows.NAME[field]
    await dispatch(saveItem())
    await dispatch(showItem())
    getState().item.treeMenuItem.map((e, i) => {
        if (e.NAME === temp) {
            dispatch(selectItemNoSave(i))
        }
    })
}

export const checkMandatoryFields = () => (dispatch, getState) => {
    var returnValue = true
    Object.keys(getState().companyDataGrid.rows).map((e) => {
        if (getState().companyDataGrid.rows[e].MANDATORY === "True") {
            Object.keys(getState().companyDataGrid.columns).map(async (a, i) => {
                if (i > 3) {
                    if (getState().companyDataGrid.rows[e][a] === "") {
                        returnValue = false
                    }
                }
            })
        }

    })
    return returnValue
}

export const confirmDataGrid = (confirmFunc, title = "") => (dispatch, getState) => {
    if (getState().companyDataGrid.isChanged) {
        dispatch({
            type: "confirmation/setConfirmation",
            payload: {
                title: title,
                body: <ConfirmDataGrid />,
                agreefunction: confirmFunc,
            }
        })
        return true
    }
    else {
        return false
    }
}
export const confirmDataGridDontSaveGo = (confirmFunc, title = "", dontSaveNextFunc) => (dispatch, getState) => {
    if (getState().companyDataGrid.isChanged) {
        dispatch({
            type: "confirmation/setConfirmation",
            payload: {
                title: title,
                body: <ConfirmDataGrid />,
                agreefunction: confirmFunc,
            }
        })
        dispatch({
            type: "confirmation/setExtraBtn",
            payload: {
                extraBtnText: "Don't save, next",
                extrafunction: dontSaveNextFunc,
            }
        })
        return true
    }
    else {
        return false
    }
}

const MemoizedInputBaseEditInputCell = React.memo(MyTextField);

function myMemoFunction(params) {
    return <MemoizedInputBaseEditInputCell {...params} />;
}

export class column {
    constructor(props) {
        this.field = props.newUuid;
        this.headerName = "";
        this.width = 150;
        this.filterable = false;
        this.sortable = false;
        this.editable = true;
        this.renderCell = myMemoFunction;
        this.renderEditCell = myMemoFunction;
        this.valueOptions = ({ row }) => {
            var myList = [];
            myList.push({ value: "", label: "" });
            console.log(row);
            var temp = row.CODE.sort((a, b) =>
                a.CODE > b.CODE ? 1 : -1
            );
            temp.map((e) => {
                if (e.CODE_TEXT) {
                    myList.push({ value: e.ROW_ID, label: e.CODE_TEXT });
                } else {

                }
            });
            return myList;
        };
    }
}

let cancelToken;
const updateDataGrid = () => async (dispatch, getState) => {
    const ITEM_ID = getState().item.selectedItem.ITEM_ID
    const CULTURE = getState().lang.cultur
    const TYPE = getState().item.type
    var body = JSON.stringify({
        CULTURE,
        TYPE,
    });
    var rows = {}
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    let res;
    try {
        dispatch({
            type: SET_LOADING,
            payload: true
        })
        let res = await instance
            .post(
                "/type/details/", body, { ...config(), cancelToken: cancelToken.token }
            )
        var response = {}
        response["HISTORY"] = {
            PROPERTY_NAME: "",
            CODE_LIST: null,
            MANDATORY: "none",
            LABEL_ID: "HISTORY",
            PROP_GRP: "",
            PROPERTY_TYPE: "HISTORY",
            SORT_ORDER: "",
            "RESOURCE-LIST": [
                {
                    SHORT_LABEL: "",
                },
            ],
        };
        Object.keys(res.data).map(e => {
            res.data[e].map(a => {
                response[a.PROPERTY_NAME] = a
            })
        })

        rows = response
    } catch (err) {
        dispatch({
            type: SET_LOADING,
            payload: false
        })
        return err
    }
    body = JSON.stringify({ ITEM_ID });
    try {
        let res = await instance
            .post(
                "/item-property/details/",
                body,
                { ...config(), cancelToken: cancelToken.token }
            )
        dispatch({
            type: CLEAN_DATA_GRID,
        })
        dispatch({
            type: ADD_ROW,
            payload: { ...rows }
        });
        Object.keys(res.data).map(e => {
            var newUuid = uuidv4()
            dispatch(addColum({ key: newUuid.replace(/-/g, ""), value: new column({ newUuid: newUuid.replace(/-/g, "") }) }, new Date(e)));
            rows["HISTORY"][newUuid.replace(/-/g, "")] = new Date(e)
            Object.keys(res.data[e]).map(a => {
                if (res.data[e][a].PROPERTY_INFO === "TEXT") {
                    rows[res.data[e][a].PROPERTY_TYPE][newUuid.replace(/-/g, "")] = res.data[e][a].PROPERTY_STRING
                } else if (res.data[e][a].PROPERTY_INFO === "NUMBER") {
                    rows[res.data[e][a].PROPERTY_TYPE][newUuid.replace(/-/g, "")] = res.data[e][a].PROPERTY_VALUE
                } else if (res.data[e][a].PROPERTY_INFO === "INT") {
                    rows[res.data[e][a].PROPERTY_TYPE][newUuid.replace(/-/g, "")] = res.data[e][a].PROPERTY_VALUE
                } else if (res.data[e][a].PROPERTY_INFO === "BOOL") {
                    if (res.data[e][a].PROPERTY_STRING === "False") {
                        rows[res.data[e][a].PROPERTY_TYPE][newUuid.replace(/-/g, "")] = false
                    } else {
                        rows[res.data[e][a].PROPERTY_TYPE][newUuid.replace(/-/g, "")] = true
                    }
                } else if (res.data[e][a].PROPERTY_INFO === "CODE") {
                    rows[res.data[e][a].PROPERTY_TYPE][newUuid.replace(/-/g, "")] = res.data[e][a].PROPERTY_CODE
                } else if (res.data[e][a].PROPERTY_INFO === "BLOB_ID") {
                    rows[res.data[e][a].PROPERTY_TYPE][newUuid.replace(/-/g, "")] = res.data[e][a].PROPERTY_BINARY
                }
            })
        })

        dispatch({
            type: ADD_ROW,
            payload: { ...rows }
        });

    } catch (err) { }
    dispatch({
        type: IS_CHANGED_HANDLER,
        payload: false
    })
    dispatch({
        type: SET_LOADING,
        payload: false
    })
}
export const selectItem = (index) => async (dispatch, getState) => {
    if (dispatch(checkMandatoryFields())) {
        if (getState().companyDataGrid.isChanged) {
            dispatch(saveItem())
        }
        if (index === -3) {
            dispatch({
                type: CLEAN_DATA_GRID,
            })
            dispatch({
                type: SET_SELECTED_ITEM,
                payload: ""
            })
        }
        else if (index === -2) {
            dispatch({
                type: CLEAN_DATA_GRID,
            })
            dispatch(loadRows(getState().lang.cultur, getState().item.type))
            dispatch({
                type: SET_SELECTED_ITEM,
                payload: { ...getState().item.treeMenuItem[index], selectedIndex: index }
            })

            var pathnames = window.location.pathname.split("/").filter((x) => x);
            pathnames[3] = "new"
            var routeTo = "";
            pathnames.map(e => {
                routeTo += `/${e}`
            })
            history.push(routeTo)

        }
        else {
            if (index < 0) {
                index = getState().item.treeMenuItem.length - 1
            }
            else if (index > getState().item.treeMenuItem.length - 1) {
                index = 0
            }
            dispatch({
                type: SET_SELECTED_ITEM,
                payload: { ...getState().item.treeMenuItem[index], selectedIndex: index }
            })
            dispatch(updateDataGrid())
        }
        if (getState().item.selectedItem.NAME) {
            var pathnames = window.location.pathname.split("/").filter((x) => x);
            pathnames[3] = getState().item.selectedItem.NAME.toLowerCase()
            var routeTo = "";
            pathnames.map(e => {
                routeTo += `/${e}`
            })
            history.push(routeTo)
        }

    } else {
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: "You must fill in the mandatory fields"
        })
    }

}

export const selectItemNoSave = (index) => async (dispatch, getState) => {
    if (index === -2) {
        dispatch({
            type: CLEAN_DATA_GRID,
        })
        dispatch(loadRows(getState().lang.cultur, getState().item.type))
        dispatch({
            type: SET_SELECTED_ITEM,
            payload: { ...getState().item.treeMenuItem[index], selectedIndex: index }
        })
        var pathnames = window.location.pathname.split("/").filter((x) => x);
        pathnames[3] = "new"
        var routeTo = "";
        pathnames.map(e => {
            routeTo += `/${e}`
        })
        history.push(routeTo)
    }
    else {
        if (index < 0) {
            index = getState().item.treeMenuItem.length - 1
        }
        else if (index > getState().item.treeMenuItem.length - 1) {
            index = 0
        }
        dispatch({
            type: SET_SELECTED_ITEM,
            payload: { ...getState().item.treeMenuItem[index], selectedIndex: index }
        })
        dispatch(updateDataGrid())
    }

    if (getState().item.selectedItem.NAME) {
        var pathnames = window.location.pathname.split("/").filter((x) => x);
        pathnames[3] = getState().item.selectedItem.NAME.toLowerCase()
        var routeTo = "";
        pathnames.map(e => {
            routeTo += `/${e}`
        })
        history.push(routeTo)
    }

}


export const deleteItem = () => async (dispatch, getState) => {
    const ITEM_ID = getState().item.selectedItem.ITEM_ID
    const body = JSON.stringify({ ITEM_ID });
    try {
        let res = await instance
            .post(
                "/item/delete/",
                body,
                config()
            )
        dispatch(showItem())
    }
    catch (err) {
    }
}

export const cleanAllTreeMenu = () => dispatch => {
    dispatch({
        type: CLEAN_ALL_TREEMENU
    })
}