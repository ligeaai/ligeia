import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Divider, Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  ComponentError,
  PropLinkTabs,
  Select,
} from "../../../../../components";
import DrawerMenu from "../../../../../layout/main/asset/treeViewMenu";

import MyActionMenu from "./actionMenu";
import { TreeMenuItems } from "./treeMenu";
import DataGridPro from "./datagrid";
import { cleanAllDataGrid } from "../../../../../services/actions/codelist/datagrid";
import {
  cleanTreeMenuSelect,
  setFilteredLayerName,
} from "../../../../../services/actions/codelist/treeview";

const CodeList = ({ isHome }) => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const filteredLayerName = useSelector(
    (state) => state.treeviewCodelist.filteredLayerName
  );
  const selectHandleChangeFunc = (params) => {
    dispatch(setFilteredLayerName(params));
  };

  React.useEffect(() => {
    if (isHome) {
      dispatch(cleanAllDataGrid());
      dispatch(cleanTreeMenuSelect());
    }
  }, [isHome]);
  return (
    <Grid
      container
      sx={{
        minHeight: isFullScreen ? "100vh" : "100%",
        height: "500px",
        flexWrap: "nowrap",
      }}
    >
      <Grid item sx={{ minHeight: "500px", boxShadow: 3, mr: 0.5 }}>
        <DrawerMenu Element={<TreeMenuItems />} />
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
            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                marginX: "2px",
                borderWidth: "0.2px",
                borderColor: "#4B4B4B",
                backgroundColor: "#4B4B4B",
              }}
            />
            <Grid item sx={{ ml: 1 }}>
              <Select
                values={["NONE", "OG_STD", "AVM"]}
                defaultValue={filteredLayerName}
                handleChangeFunc={selectHandleChangeFunc}
              />
            </Grid>
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
