import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Box } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  ComponentError,
  PropLinkTabs,
  Select,
  MyDivider,
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
import { selectDrawerItem } from "../../../../../services/actions/drawerMenu/drawerMenu";
import "../../../../../assets/styles/page/tools/codelist/codelist.scss";
const CodeList = ({ isHome }) => {
  document.title = `Ligeia.ai | Code List`;
  selectDrawerItem("Code List");
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
    <React.Fragment>
      <DrawerMenu Element={<Menu />} path="codelist" />

      <Box className="code-list-container__body">
        <Breadcrumb />
        <ItemSperatorLineXL />
        <Grid container className="code-list-container__body__action-box">
          <Grid item className="code-list-container__body__action-box__icons">
            <ComponentError errMsg="Error">
              <MyActionMenu />
            </ComponentError>
          </Grid>
          <MyDivider />
          <Grid
            item
            className="code-list-container__body__action-box__layer-select"
          >
            <Select
              values={layerValues}
              defaultValue={filteredLayerName}
              handleChangeFunc={selectHandleChangeFunc}
            />
          </Grid>
          <MyDivider />
        </Grid>
        <ItemSperatorLineXL />
        <Grid item xs={12} className="code-list-container__body__property-box">
          <ComponentError errMsg="Error">
            <PropLinkTabs MyProperties={<DataGridPro />} isLinkOpen={false} />
          </ComponentError>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(CodeList);
