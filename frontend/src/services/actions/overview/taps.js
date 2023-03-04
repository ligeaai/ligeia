import {
  FILL_TAPS_OVERVIEW,
  SET_SELECT_TAB_ITEM,
  CLEAN_TABS_OVERVIEW,
  REFRESH_WIDGETS_OVERVIEW,
  UPDATE_LAYOUT,
  SET_ISCHECKED,
  SET_UPDATE_ISCHECKED,
  SET_ITEM_DATA_OVERVIEW
} from "../types";
import { instance, config } from "../../couchApi";
import TabLinks from "../../api/couch/taplinks"
import Widgets from "../../api/couch/widgets"
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
export const loadTapsOverview = () => async (dispatch, getState) => {
  const linkId = getState().collapseMenu.selectedItem.LINK_ID;
  try {
    let res = await TabLinks.get(linkId)
    var titles = [];
    var widgets = {};
    var data = {}
    Promise.all(Object.keys(res.data.data).map(e => {
      if (res.data.data[e].widgets && res.data.data[e].layouts) {
        titles.push(e)
        widgets[e] = res.data.data[e]
      }
    }))
    console.log(titles);
    console.log(widgets);
    data = { ...res.data, data: widgets }
    dispatch({
      type: FILL_TAPS_OVERVIEW,
      payload: { titles, widgets: widgets, data: data },
    });
    dispatch({
      type: REFRESH_WIDGETS_OVERVIEW,
    });
    dispatch(_setLinkedItem())
  } catch (err) {
    if (err.response.status === 404) {
      const body = JSON.stringify({ _id: linkId, data: {} });
      await TabLinks.create(body)
    }
    dispatch(loadTapsOverview());
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

export const deleteChart = (id, revId) => async (dispatch, getState) => {
  const selected = getState().tapsOverview.selected;
  const resData = getState().tapsOverview;
  let myData = resData.data;
  myData.data[selected].widgets.find((e, i) =>
    e === id ? myData.data[selected].widgets.splice(i, 1) : null
  );
  myData.data[selected].layouts.lg.find((e, i) =>
    e.i === id ? myData.data[selected].layouts.lg.splice(i, 1) : null
  );
  myData.data[selected].layouts.md.find((e, i) =>
    e.i === id ? myData.data[selected].layouts.md.splice(i, 1) : null
  );
  myData.data[selected].layouts.sm.find((e, i) =>
    e.i === id ? myData.data[selected].layouts.sm.splice(i, 1) : null
  );
  myData.data[selected].layouts.xs.find((e, i) =>
    e.i === id ? myData.data[selected].layouts.xs.splice(i, 1) : null
  );
  myData.data[selected].layouts.xxs.find((e, i) =>
    e.i === id ? myData.data[selected].layouts.xxs.splice(i, 1) : null
  );

  const selectedLink = getState().collapseMenu.selectedItem.LINK_ID;

  const body = JSON.stringify({ ...myData });
  try {
    await Widgets.remove(id, revId)
    await TabLinks.update(selectedLink, body)
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
  const selectedLink = getState().collapseMenu.selectedItem.LINK_ID;

  const resData = getState().tapsOverview.data;
  const newTabName = _newTapNameChoser(Object.keys(resData.data));
  const tablinkBody = {
    ...resData,
    data: {
      ...resData.data,
      [newTabName]: {
        widgets: [],
        layouts: {
          lg: [],
          md: [],
          sm: [],
          xs: [],
          xxs: [],
        },
      },
    },
  };
  try {
    await TabLinks.update(selectedLink, tablinkBody)
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
    const selectedLink = getState().collapseMenu.selectedItem.LINK_ID;
    const resData = getState().tapsOverview.data;

    if (_checkHeader(oldHeader, newHeader, Object.keys(resData.data))) {
      resData.data[newHeader] = resData.data[oldHeader];
      delete resData.data[oldHeader];

      const tablinkBody = {
        ...resData,
        data: {
          ...resData.data,
        },
      };
      try {
        await TabLinks.update(selectedLink, tablinkBody)
        dispatch(loadTapsOverview());
        dispatch({
          type: SET_SELECT_TAB_ITEM,
          payload: newHeader,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

function _deleteAllCharts(charts) {
  charts.map(async (e) => {
    try {
      let res = await Widgets.get(e)
      await Widgets.remove(e, res.data._rev)
    } catch { }
  });
}

export const deleteTapHeader = (header) => async (dispatch, getState) => {
  const selectedLink = getState().collapseMenu.selectedItem.LINK_ID;
  const resData = getState().tapsOverview.data;
  const charts = resData.data[header].widgets;
  delete resData.data[header];
  const tablinkBody = {
    ...resData,
    data: {
      ...resData.data,
    },
  };
  try {
    await TabLinks.update(selectedLink, tablinkBody)
    dispatch(loadTapsOverview());
    _deleteAllCharts(charts);
  } catch (err) {
    console.log(err);
  }
};

export const updateChart = () => async (dispatch, getState) => {
  const chartProps = getState().overviewDialog.highchartProps;
  const body = JSON.stringify({ ...chartProps });
  try {
    await Widgets.update(chartProps._id, body)
  } catch { }
};
export const updateChartLayout = (layout) => async (dispatch, getState) => {
  const selectedTab = getState().tapsOverview.selected;
  const resData = getState().tapsOverview.data;
  const tablinkBody = {
    ...resData,
    data: {
      ...resData.data,
      [selectedTab]: {
        ...resData.data[selectedTab],
        layouts: layout,
      },
    },
  };
  dispatch({
    type: UPDATE_LAYOUT,
    payload: tablinkBody,
  });
};

export const updateCouchDb = () => async (dispatch, getState) => {
  const selectedLink = getState().collapseMenu.selectedItem.LINK_ID;
  const resData = getState().tapsOverview.data;
  const tablinkBody = {
    ...resData,
  };
  try {
    let res = await TabLinks.update(selectedLink, tablinkBody)
  } catch (err) { }
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