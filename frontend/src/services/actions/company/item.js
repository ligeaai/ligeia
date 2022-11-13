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
    SET_LOADING
} from "../types"

import { addColum } from "./datagrid"
import { MyTextField } from "../../../pages/main/configuration/organization/myTextField";
import { loadRows } from "./datagrid";
import ConfirmDataGrid from "../../../pages/main/configuration/organization/dataGrid/confirmDataGrid";
import { instance, config } from '../../baseApi';
import history from "../../../routers/history";
function _uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}

export const showItem = () => async (dispatch, getState) => {
    const type = getState().item.type.toLowerCase()

    try {
        let res = await instance
            .get(
                `/item/details/${type}`,
                config
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
        const uuid = _uuidv4()
        var COLUMNS = []
        var ITEM = {}
        console.log("asdasd");
        Object.keys(getState().companyDataGrid.columns).map(async (a, i) => {
            if (i > 3) {
                var d = getState().companyDataGrid.rows.HISTORY[a].getDate();
                var m = getState().companyDataGrid.rows.HISTORY[a].getMonth();
                m += 1;
                var y = getState().companyDataGrid.rows.HISTORY[a].getFullYear();
                var newdate = (y + "-" + m + "-" + d);
                COLUMNS.push({
                    "START_TIME": newdate,
                })
                Object.keys(getState().companyDataGrid.rows).map((e) => {
                    //&& getState().companyDataGrid.rows[e][a] === null && getState().companyDataGrid.rows[e][a] === ""
                    if (e !== "HISTORY") {
                        var propsRowUuid = _uuidv4()
                        if (getState().companyDataGrid.rows[e].PROPERTY_TYPE === "NUMBER" || getState().companyDataGrid.rows[e].PROPERTY_TYPE === "INT") {
                            console.log(i);
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

                var rowUuid = _uuidv4()
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
                    config
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

export class column {
    constructor(props) {
        this.field = props.newUuid;
        this.headerName = "";
        this.width = 150;
        this.filterable = false;
        this.sortable = false;
        this.editable = true;
        this.renderCell = MyTextField;
        this.renderEditCell = MyTextField;
        this.valueOptions = ({ row }) => {
            var myList = [];
            myList.push("");

            var temp = row["CODE-LIST"].sort((a, b) => (a.CODE > b.CODE ? 1 : -1));
            temp.map((e) => {
                if (e.CODE_TEXT) {
                    myList.push(e.CODE_TEXT);
                } else {
                    console.log(e);
                }
            });
            return myList;
        };
    }
}


const updateDataGrid = () => async (dispatch, getState) => {

    dispatch({
        type: SET_LOADING,
        payload: true
    })
    const ITEM_ID = getState().item.selectedItem.ITEM_ID
    const CULTURE = getState().lang.cultur
    const TYPE = getState().item.type
    var body = JSON.stringify({
        CULTURE,
        TYPE,
    });
    var rows = {}
    try {
        let res = await instance
            .post(
                "/type/details/", body, config
            )
        var response = {}
        response["HISTORY"] = {
            PROPERTY_NAME: "HISTORY",
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
        res.data.TYPE["TYPE PROPERTY COLUMNS"].TYPE.map(e => {
            response[e.PROPERTY_NAME] = e
        })
        res.data.TYPE["TYPE PROPERTY COLUMNS"].BASETYPE.map(e => {
            response[e.PROPERTY_NAME] = e
        })
        rows = response
    } catch (err) {
        dispatch({
            type: SET_LOADING,
            payload: false
        })
        console.log(err);
        return err
    }
    body = JSON.stringify({ ITEM_ID });
    try {
        let res = await instance
            .post(
                "/item-property/details/",
                body,
                config
            )
        dispatch({
            type: CLEAN_DATA_GRID,
        })
        dispatch({
            type: ADD_ROW,
            payload: rows
        });
        Object.keys(res.data).map(e => {
            var newUuid = _uuidv4()
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
            payload: rows
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
                config
            )
        dispatch(showItem())
    }
    catch (err) {
        console.log(err);
    }
}