import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import {
  BreadcrumbBox,
  ItemSperatorLineXL,
  ComponentError,
  PropLinkTabs,
  Select,
  MyDivider,
  MainBox,
} from "../../../../../components";
import DrawerMenu from "../../../../../layout/main/asset/treeViewMenu";

import MyActionMenu from "./actionMenu";
import DataGridPro from "./datagrid";
import { cleanAllDataGrid } from "../../../../../services/actions/codelist/datagrid";

import {
  setFilteredLayerName,
  selectTreeViewItem,
} from "../../../../../services/actions/treeview/treeview";
import { instance, config } from "../../../../../services/baseApi";

import Menu from "./treeMenu";

const CodeList = ({ isHome }) => {
  document.title = `Ligeia.ai | Codelist`;
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
  }, []);

  React.useEffect(() => {
    if (isHome) {
      dispatch(selectTreeViewItem(-3, "", 3));
      dispatch(cleanAllDataGrid());
    }
  }, [isHome]);

  return (
    <MainBox>
      <Grid item>
        <DrawerMenu Element={<Menu />} path="codelist" />
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

export default React.memo(CodeList);
