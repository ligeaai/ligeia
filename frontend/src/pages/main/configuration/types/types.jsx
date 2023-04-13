import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import {
  BreadcrumbBox,
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

import TypeService from "../../../../services/api/type";
import { useIsMount } from "../../../../hooks/useIsMount";
const Menu = () => {
  document.title = `Liegia.ai | Types`;
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
  const dispatch = useDispatch();
  const filteredLayerName = useSelector(
    (state) => state.treeview.filteredLayerName
  );
  const [layerValues, setLayerValues] = React.useState(["NONE"]);
  const selectHandleChangeFunc = (params) => {
    dispatch(setFilteredLayerName(params));
  };
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
          <BreadcrumbBox />
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
