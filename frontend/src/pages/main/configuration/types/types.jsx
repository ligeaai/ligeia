import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  ComponentError,
  PropLinkTabs,
  Select,
  TreeMenuItems,
  MyDivider,
  MainBox,
} from "../../../../components";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";

import MyActionMenu from "./myActionMenu";

import DataGridPro from "./datagrid";

import {
  setFilteredLayerName,
  filterMenu,
} from "../../../../services/actions/treeview/treeview";

import { instance, config } from "../../../../services/baseApi";
import { cleanAllDataGrid } from "../../../../services/actions/type/datagrid";
import {
  saveTypeFunc,
  addNewType,
} from "../../../../services/actions/type/datagrid";
import {
  setBodyConfirmation,
  setSaveFunctonConfirmation,
  setTitleConfirmation,
} from "../../../../services/actions/confirmation/historyConfirmation";
import { refreshDataGridType } from "../../../../services/actions/type/datagrid";
import TypeService from "../../../../services/api/type";
import { useIsMount } from "../../../../hooks/useIsMount";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
const Menu = () => {
  document.title = `Ligeia.ai | Types`;
  selectDrawerItem("Types");
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const text = useSelector((state) => state.searchBar.text);
  React.useEffect(() => {
    if (!isMount) {
      const body = JSON.stringify({
        TYPE: text,
      });
      dispatch(filterMenu(text, TypeService.elasticSearch, body));
    }
  }, [text]);

  return (
    <TreeMenuItems
      path={TypeService.getAll}
      textPath="TYPE"
      historyPathLevel={2}
    />
  );
};

const Type = () => {
  const isMount = useIsMount();

  const dispatch = useDispatch();
  const filteredLayerName = useSelector(
    (state) => state.treeview.filteredLayerName
  );
  const [layerValues, setLayerValues] = React.useState(["NONE"]);
  const selectHandleChangeFunc = (params) => {
    dispatch(setFilteredLayerName(params));
  };
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const type = useSelector((state) => state.treeview.selectedItem.TYPE);
  React.useEffect(() => {
    if (isMount) {
      dispatch(setSaveFunctonConfirmation(saveTypeFunc));
      dispatch(setTitleConfirmation("Are you sure you want to save ? "));
    }
    dispatch(setBodyConfirmation(`${type ? type : "new"}`));
    if (selectedIndex === -2) {
      dispatch(addNewType());
    } else if (selectedIndex >= 0) {
      dispatch(refreshDataGridType());
    }
  }, [selectedIndex, type]);

  React.useEffect(() => {
    const myFunc = async () => {
      try {
        let res = await instance.get(`/layer/layer-dropdown/`, config());
        var myRes = [];
        res.data.map((e) => {
          myRes.push(e.LAYER_NAME);
        });
        setLayerValues(["NONE", ...myRes]);
      } catch {}
    };
    myFunc();
    return () => {
      dispatch(cleanAllDataGrid());
    };
  }, []);

  return (
    <MainBox>
      <Grid item>
        <DrawerMenu
          Element={
            <Menu
              path={TypeService.getAll}
              textPath="TYPE"
              historyPathLevel={2}
            />
          }
          path="types"
        />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          boxShadow: 3,
          borderRadius: "3px",
          width: "100px",
        }}
      >
        <Grid container>
          <Breadcrumb />
          <ItemSperatorLineXL />
          <Grid container sx={{ alignItems: "center", pl: 2, marginY: "2px" }}>
            <Grid item sx={{ mr: "2px" }}>
              <MyActionMenu />
            </Grid>
            <MyDivider />
            <Grid item sx={{ mx: 1 }}>
              <Select
                values={layerValues}
                defaultValue={filteredLayerName}
                handleChangeFunc={selectHandleChangeFunc}
              />
            </Grid>
            <MyDivider />
          </Grid>

          <ItemSperatorLineXL />
          <Grid item xs={12} sx={{ mt: 1 }}>
            <ComponentError errMsg="Error">
              <PropLinkTabs MyProperties={<DataGridPro />} isLinkOpen={false} />
            </ComponentError>
          </Grid>
        </Grid>
      </Grid>
    </MainBox>
  );
};

export default Type;
