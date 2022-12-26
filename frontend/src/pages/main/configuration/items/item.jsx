import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  PropLinkTabs,
  TreeMenuItems,
  ComponentError,
  MyDivider,
} from "../../../../components";

import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";
import {
  loadTreeviewItem,
  cleanTreeview,
} from "../../../../services/actions/treeview/treeview";
import ItemService from "../../../../services/api/item";

import Properties from "./properties/properties";
import { useIsMount } from "../../../../hooks/useIsMount";
import {
  loadTypeRowsDataGrid,
  cleanDataGrid,
  cleanDataGridItemAndRows,
} from "../../../../services/actions/item/itemDataGrid";
import MyActionMenu from "./properties/actionMenu";
import DateBreak from "./properties/dateBreak";
import Link from "./link/link";
import { loadItemLinkSchema } from "../../../../services/actions/item/itemLinkEditor";

import LinkActionMenu from "./link/linkActionMenu";
const Menu = () => {
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const type = useSelector((state) => state.drawerMenu.selectedItem.TYPE);
  React.useEffect(() => {
    if (!isMount) {
      dispatch(loadTreeviewItem(pathFunction, "NAME"));
    }
    dispatch(loadTypeRowsDataGrid());
    dispatch(loadItemLinkSchema());
    return async () => {
      dispatch(await cleanTreeview());
      dispatch(cleanDataGrid());
    };
  }, [type]);

  const pathFunction = async (body, cancelToken) => {
    return await ItemService.getAll(body, cancelToken, type);
  };

  return <TreeMenuItems path={pathFunction} textPath="NAME" />;
};

const UnitOne = ({ isHome }) => {
  const dispatch = useDispatch();

  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const isLinksActive = useSelector(
    (state) => state.itemLinkEditor.isLinksActive
  );
  React.useEffect(() => {
    if (isHome) {
      dispatch(cleanDataGridItemAndRows());
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
        <DrawerMenu Element={<Menu />} />
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
            <Box
              sx={{ ml: 2.5 }}
              onClick={() => {
                dispatch({
                  type: "SELECT_TREEVIEW_ITEM",
                  payload: { selectedIndex: -3 },
                });
              }}
            >
              <Breadcrumb />
            </Box>
          </Grid>
          <ItemSperatorLineXL />

          <Grid container sx={{ alignItems: "center", pl: 2 }}>
            <Grid item>
              {isLinksActive ? <LinkActionMenu /> : <MyActionMenu />}
            </Grid>
            <MyDivider />
            <Grid item sx={{ mr: 1 }}>
              {isLinksActive ? <DateBreak props={true} /> : <DateBreak />}
            </Grid>
            <MyDivider />
          </Grid>

          <ItemSperatorLineXL />
          <Grid item xs={12} sx={{ mt: 1, mr: 1 }}>
            <ComponentError errMsg="Error">
              <PropLinkTabs
                MyProperties={<Properties></Properties>}
                MyLinks={<Link />}
              />
            </ComponentError>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UnitOne;
