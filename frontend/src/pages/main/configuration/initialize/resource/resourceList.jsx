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
import { selectDrawerItem } from "../../../../../services/actions/drawerMenu/drawerMenu";
import "../../../../../assets/styles/page/tools/resourcelist/resourcelist.scss";
const Menu = () => {
  document.title = `Ligeia.ai | Resources`;
  selectDrawerItem("Resources");
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
    <React.Fragment>
      <DrawerMenu Element={<Menu />} path="resources" />

      <Box className="resource-list-container__body">
        <Breadcrumb />
        <ItemSperatorLineXL />
        <Grid container className="resource-list-container__body__action-box">
          <Grid
            item
            className="resource-list-container__body__action-box__icons"
          >
            <ComponentError errMsg="Error">
              <MyActionMenu />
            </ComponentError>
          </Grid>
          <MyDivider />
          <Grid
            item
            className="resource-list-container__body__action-box__layer-select"
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
        <Grid
          item
          xs={12}
          className="resource-list-container__body__property-box"
        >
          <ComponentError errMsg="Error">
            <PropLinkTabs MyProperties={<DataGridPro />} isLinkOpen={false} />
          </ComponentError>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(ResourceList);
