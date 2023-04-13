import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Divider, Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  ComponentError,
  PropLinkTabs,
  Select,
  MyDivider,
  TreeMenuItems,
} from "../../../../../components";
import DrawerMenu from "../../../../../layout/main/asset/treeViewMenu";

import MyActionMenu from "./actionMenu";
import DataGridPro from "./resourceDatagrid";
import { cleanAllDataGrid } from "../../../../../services/actions/resource/datagridResource";

import {
  setFilteredLayerName,
  filterMenu,
} from "../../../../../services/actions/treeview/treeview";
import { instance, config } from "../../../../../services/baseApi";
import ResourcelistService from "../../../../../services/api/resourceList";
import { useIsMount } from "../../../../../hooks/useIsMount";
const Menu = () => {
  document.title = `Ligeia.ai | Resources`;
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const text = useSelector((state) => state.searchBar.text);
  const culture = useSelector((state) => state.lang.cultur);
  React.useEffect(() => {
    if (!isMount) {
      const body = JSON.stringify({
        PARENT: text,
        CULTURE: culture,
      });
      dispatch(filterMenu(text, ResourcelistService.elasticSearch, body));
    }
  }, [text]);

  return (
    <TreeMenuItems
      path={ResourcelistService.getAllTreeitem}
      textPath="PARENT"
      historyPathLevel={2}
    />
  );
};

const ResourceList = ({ isHome }) => {
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
  }, []);

  React.useEffect(() => {
    if (isHome) {
      dispatch(cleanAllDataGrid());
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
      <Grid item>
        <DrawerMenu Element={<Menu />} path="resources" />
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
              backgroundColor: "status.main",
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
    </Grid>
  );
};

export default React.memo(ResourceList);
