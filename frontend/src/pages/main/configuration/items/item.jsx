import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";

import {
  ItemSperatorLineXL,
  PropLinkTabs,
  ComponentError,
  MyDivider,
  Breadcrumb,
  MainBox,
} from "../../../../components";

import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";

import Properties from "./properties/properties";
import { cleanDataGridItemAndRows } from "../../../../services/actions/item/itemDataGrid";
import MyActionMenu from "./properties/actionMenu";
import DateBreak from "./properties/dateBreak";
import Link from "./link/link";
import LinkActionMenu from "./link/linkActionMenu";
import TreeMenu from "./treeMenu";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
const Item = ({ isHome }) => {
  const dispatch = useDispatch();
  const isLinksActive = useSelector(
    (state) => state.itemLinkEditor.isLinksActive
  );
  const shortLabel = useSelector(
    (state) => state.drawerMenu.selectedItem?.SHORT_LABEL
  );
  document.title = `Ligeia.ai | ${shortLabel}`;
  selectDrawerItem(shortLabel);
  React.useEffect(() => {
    if (isHome) {
      dispatch(cleanDataGridItemAndRows());
      dispatch({
        type: "SELECT_TREEVIEW_ITEM",
        payload: { selectedIndex: -3 },
      });
    }
  }, [isHome]);
  return (
    <MainBox>
      <Grid item>
        <DrawerMenu Element={<TreeMenu />} path="item" />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          boxShadow: 3,
          borderRadius: "3px",
          width: "100px",
          color: "text.primary",
          overflow: "hidden",
        }}
      >
        <Grid container>
          <Breadcrumb />
          <ItemSperatorLineXL />
          <Grid container sx={{ alignItems: "center", pl: 2, marginY: "2px" }}>
            <Grid item sx={{ mr: "2px" }}>
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
    </MainBox>
  );
};

export default Item;
