import {
    SET_SELECTED_DRAWER_ITEM,
    LOAD_DRAWER_MENU,
    DRAWER_MENU_SET_OPEN,
} from "../types"
import $ from "jquery"
import DrawerMenu from "../../api/drawerMenu";
import { urlFormatter } from "../../utils/urlFormatter";

const configureSubMenu = (params) => {
    Object.keys(params).map(e => {
        if (params[e]) {
            $(`.drawer-menu__${urlFormatter(e)}opened-list-item__arrow-up-icon`).show(200);
            $(`.drawer-menu__${urlFormatter(e)}opened-list-item__arrow-down-icon`).hide(200);
            $(`#drawer-menu_${urlFormatter(e)}-collapse-item`).show(400);
        } else {
            $(`.drawer-menu__${urlFormatter(e)}opened-list-item__arrow-up-icon`).hide(200);
            $(`.drawer-menu__${urlFormatter(e)}opened-list-item__arrow-down-icon`).show(200);
            $(`#drawer-menu_${urlFormatter(e)}-collapse-item`).hide(400);
        }
    })
}

export const loadDrawerMenu = () => async (dispatch, getState) => {
    const CULTURE = getState().lang.cultur
    const openSupMenu = getState().drawerMenu.openTabs
    try {
        const body = JSON.stringify({ CULTURE })
        let res = await DrawerMenu.get(body)
        await dispatch({
            type: LOAD_DRAWER_MENU,
            payload: res.data
        })
        selectDrawerItem(document.title.split("|")[1].trim());
        configureSubMenu(openSupMenu)
    } catch (err) {
        console.log(err);
    }
}

export const setSelectedDrawerItem = (payload) => async (dispatch) => {
    dispatch({
        type: SET_SELECTED_DRAWER_ITEM,
        payload: payload
    })
}


const setOpenTab = (itemId) => dispatch => {
    dispatch({
        type: DRAWER_MENU_SET_OPEN,
        payload: itemId
    })
}

export const selectDrawerItem = (params) => {
    try {
        $(`.drawer-menu__selected-list-item`).toggleClass("drawer-menu__selected-list-item")
        $(`.drawer-menu__${urlFormatter(params)}-list-item`).toggleClass("drawer-menu__selected-list-item")
    } catch (err) {
        console.log(err);
    }
}

export const toggleDrawerSubItem = (params) => dispatch => {
    $(`.drawer-menu__${urlFormatter(params)}opened-list-item__arrow-up-icon`).toggle(200);
    $(`.drawer-menu__${urlFormatter(params)}opened-list-item__arrow-down-icon`).toggle(200);
    $(`#drawer-menu_${urlFormatter(params)}-collapse-item`).toggle(400);
    dispatch(setOpenTab(params))
}