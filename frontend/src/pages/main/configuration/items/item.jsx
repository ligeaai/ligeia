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
import "../../../../assets/styles/page/item.scss";
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
    <Grid container columnGap={0.5} className="item-container">
      <Grid item>
        <DrawerMenu Element={<TreeMenu />} path="item" />
      </Grid>

      <Grid item xs={12} className="item-container__body">
        <Breadcrumb />
        <ItemSperatorLineXL />
        <Grid container className="item-container__body__action-box">
          <Grid item className="item-container__body__action-box__icons">
            {isLinksActive ? <LinkActionMenu /> : <MyActionMenu />}
          </Grid>
          <MyDivider />
          <Grid item className="item-container__body__action-box__date-break">
            {isLinksActive ? <DateBreak props={true} /> : <DateBreak />}
          </Grid>
          <MyDivider />
        </Grid>

        <ItemSperatorLineXL />
        <Grid item xs={12} className="item-container__body__property-box">
          <ComponentError errMsg="Error">
            <PropLinkTabs
              MyProperties={<Properties></Properties>}
              MyLinks={<Link />}
            />
          </ComponentError>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Item;
