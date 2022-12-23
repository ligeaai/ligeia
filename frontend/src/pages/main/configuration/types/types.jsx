import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  ComponentError,
  PropLinkTabs,
  Select,
  TreeMenuItems,
  MyDivider,
} from "../../../../components";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";

import MyActionMenu from "./myActionMenu";

import DataGridPro from "./datagrid";

import { setFilteredLayerName } from "../../../../services/actions/treeview/treeview";

import { instance, config } from "../../../../services/baseApi";
import { cleanAllDataGrid } from "../../../../services/actions/type/datagrid";

import TypeService from "../../../../services/api/type";
const CodeList = () => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
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
    <Grid
      container
      sx={{
        minHeight: isFullScreen ? "100vh" : "100%",
        height: "500px",
        flexWrap: "nowrap",
      }}
    >
      <Grid item>
        <DrawerMenu
          Element={<TreeMenuItems path={TypeService.getAll} textPath="TYPE" />}
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
          <Grid
            item
            xs={12}
            sx={{
              position: "relative",
              height: "42px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "myTreeViewBg",
              color: "text.primary",
              borderTopLeftRadius: "3px",
              borderTopRightRadius: "3px",
            }}
          >
            <Box sx={{ ml: 2.5 }}>
              <Breadcrumb />
            </Box>
          </Grid>
          <ItemSperatorLineXL />

          <Grid container sx={{ alignItems: "center", pl: 2 }}>
            <Grid item>
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
    </Grid>
  );
};

export default CodeList;
