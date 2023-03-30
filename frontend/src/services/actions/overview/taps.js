import {
  FILL_TAPS_OVERVIEW,
  SET_SELECT_TAB_ITEM,
  CLEAN_TABS_OVERVIEW,
  REFRESH_WIDGETS_OVERVIEW,
  SET_ISCHECKED,
  SET_UPDATE_ISCHECKED,
  SET_ITEM_DATA_OVERVIEW
} from "../types";
import Overview from "../../api/overview";
import axios from "axios";
import { uuidv4 } from "../../utils/uuidGenerator";

const _setLinkedItem = () => (dispatch, getState) => {
  const selectedItem = getState().collapseMenu.selectedItem;
  let list = []
  console.log(selectedItem)
  function myFunc(myItems, index = 0) {
    myItems.map(e => {
      list.push([e.FROM_ITEM_ID, e.FROM_ITEM_NAME, index])
      if (e.CHILD) {
        myFunc(e.CHILD, index + 1)
      }
    })
  }
  myFunc([selectedItem])
  dispatch({
    type: SET_ITEM_DATA_OVERVIEW,
    payload: list
  })
}

let cancelToken;
export const loadTapsOverview = () => async (dispatch, getState) => {
  const linkId = getState().collapseMenu.selectedItem.FROM_ITEM_ID;
  try {
    if (cancelToken) {
      cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    const body = JSON.stringify({ ITEM_ID: linkId })
    let res = await Overview.getDashboards(body, cancelToken)
    console.log(res);
    var titles = Object.keys(res.data);
    var widgets = res.data;
    var data = {}
    dispatch({
      type: FILL_TAPS_OVERVIEW,
      payload: { titles, widgets: widgets, data: data },
    });
    dispatch({
      type: REFRESH_WIDGETS_OVERVIEW,
    });
    dispatch(_setLinkedItem())
  } catch (err) {
    console.log(err);
  }
};

export const selectTab = (payload) => (dispatch) => {
  dispatch({
    type: SET_SELECT_TAB_ITEM,
    payload: payload,
  });
};

export const cleanTabs = () => (dispatch) => {
  dispatch({
    type: CLEAN_TABS_OVERVIEW,
  });
};

export const deleteChart = (id) => async (dispatch) => {
  const body = JSON.stringify({ WIDGET_ID: id });
  try {
    await dispatch(updateLayouts())
    await Overview.removeWidget(body)
    dispatch(loadTapsOverview());
  } catch (err) {
    console.log(err);
  }
};

function _newTapNameChoser(keys) {
  let i = 0;
  while (true) {
    let newName = `Dashbord ${i}`;
    if (!keys.some((e) => e === newName)) {
      return newName;
    }
    i++;
  }
}

export const addNewTabItem = () => async (dispatch, getState) => {
  const selectedItemID = getState().collapseMenu.selectedItem.FROM_ITEM_ID;
  const titles = getState().tapsOverview.titles
  const newTabName = _newTapNameChoser(titles);
  const culture = getState().lang.cultur
  const body = JSON.stringify({
    "NAME": newTabName,
    "CULTURE": culture,
    "LAYER_NAME": "KNOC",
    "ITEM_ID": selectedItemID,
    "ROW_ID": uuidv4().replace(/-/g, ""),
    "WIDGETS": []
  })
  try {
    await Overview.updateDashboards(body)
    dispatch(loadTapsOverview());
  } catch (err) { }
};

const _checkHeader = (oldHeader, newHeader, keys) => {
  if (oldHeader === newHeader) {
    return false;
  }
  if (keys.some((e) => e === newHeader)) {
    return false;
  }
  return true;
};

export const updateTabHeader =
  (oldHeader, newHeader) => async (dispatch, getState) => {
    const titles = getState().tapsOverview.titles
    const widget = getState().tapsOverview.widgets[oldHeader]
    const culture = getState().lang.cultur
    if (_checkHeader(oldHeader, newHeader, (titles))) {
      const body = JSON.stringify({
        ROW_ID: widget.ROW_ID,
        NAME: newHeader,
        CULTURE: culture,
        LAYER_NAME: "KNOC"
      })
      console.log(body);
      try {
        await Overview.updateDashboards(body)
        await dispatch(loadTapsOverview());
        dispatch({
          type: SET_SELECT_TAB_ITEM,
          payload: newHeader,
        });
      } catch (err) {
        console.log(err);
      }
    };
  };

export const deleteTapHeader = (header) => async (dispatch, getState) => {
  const dashboard = getState().tapsOverview.widgets[header];
  try {
    const body = JSON.stringify({ ROW_ID: dashboard.ROW_ID })
    await Overview.removeDashboards(body)
    dispatch(loadTapsOverview());
  } catch (err) {
    console.log(err);
  }
};

export const updateLayouts = () => async (dispatch, getState) => {
  const selectedTab = getState().tapsOverview.selected;
  const layouts = getState().tapsOverview.widgets[selectedTab].layouts;
  const body = JSON.stringify(layouts)
  try {
    let res = await Overview.layoutUpdate(body)
    console.log(res);
  } catch (err) { console.log(err); }
};


export const updateChecked = (key, val) => (dispatch) => {
  dispatch({
    type: SET_UPDATE_ISCHECKED,
    payload: { key: key, val: val },
  });
}

export const setCheckeds = (val) => (dispatch) => {
  let temp = {}
  val.map(e => {
    temp[e.TAG_ID] = false
  })
  dispatch({
    type: SET_ISCHECKED,
    payload: temp
  })
}

export const setCheckedsAsset = (val) => (dispatch) => {
  let temp = {}
  val.map(e => {
    temp[e[0]] = false
  })
  dispatch({
    type: SET_ISCHECKED,
    payload: temp
  })
}