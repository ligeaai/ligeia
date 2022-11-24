import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid, Typography, Divider } from "@mui/material";

import {
  TreeView,
  Breadcrumb,
  ItemSperatorLineXL,
  Select,
} from "../../../components";
import { menu } from "./owerviewMenu";

import DrawerMenu from "../../../layout/main/asset/treeViewMenu";
import OverviewEditor from "./overviewEditor";
import OverviewActionMenu from "./overviewActionMenu";

import {
  changeChartType,
  loadChartData,
} from "../../../services/actions/overview/highchar";
const Overview = () => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const selectHandleChangeFunc = (chartType) => {
    dispatch(changeChartType(chartType));
  };
  React.useEffect(() => {
    dispatch(loadChartData());
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
      <Grid item sx={{ minHeight: "500px", boxShadow: 3, mr: 0.5 }}>
        <DrawerMenu Element={<TreeView menu={menu} />} />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          boxShadow: 3,
          borderRadius: "3px",
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
            <Box sx={{ ml: 3 }}>
              <Breadcrumb />
            </Box>
          </Grid>
          <ItemSperatorLineXL />
          <Grid container sx={{ alignItems: "center", pl: 2 }}>
            <Grid item>
              <OverviewActionMenu />
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
                values={["spline", "column"]}
                defaultValue={"spline"}
                handleChangeFunc={selectHandleChangeFunc}
              />
            </Grid>
          </Grid>
          <ItemSperatorLineXL />
          <Grid item xs={12} sx={{ mt: 1, mr: 1 }}>
            <OverviewEditor />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Overview;
