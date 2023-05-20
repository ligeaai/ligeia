import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Grid, Box } from "@mui/material";

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

import {
  setFilteredLayerName,
  filterMenu,
} from "../../../../services/actions/treeview/treeview";

import { instance, config } from "../../../../services/baseApi";
import { cleanAllDataGrid } from "../../../../services/actions/type/datagrid";
import {
  saveTypeFunc,
  addNewType,
} from "../../../../services/actions/type/datagrid";
import {
  setBodyConfirmation,
  setSaveFunctonConfirmation,
  setTitleConfirmation,
} from "../../../../services/actions/confirmation/historyConfirmation";
import { refreshDataGridType } from "../../../../services/actions/type/datagrid";
import TypeService from "../../../../services/api/type";
import { useIsMount } from "../../../../hooks/useIsMount";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
import "../../../../assets/styles/page/tools/types/types.scss";
import "../../../../assets/styles/layouts/template.scss";
const Menu = () => {
  document.title = `Ligeia.ai | Types`;
  selectDrawerItem("Types");
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const text = useSelector((state) => state.searchBar.text);
  React.useEffect(() => {
    if (!isMount) {
      const body = JSON.stringify({
        TYPE: text,
      });
      dispatch(filterMenu(text, TypeService.elasticSearch, body));
    }
  }, [text]);

  return (
    <TreeMenuItems
      path={TypeService.getAll}
      textPath="TYPE"
      historyPathLevel={2}
    />
  );
};

const Type = () => {
  const isMount = useIsMount();

  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const type = useSelector((state) => state.treeview.selectedItem.TYPE);
  React.useEffect(() => {
    if (isMount) {
      dispatch(setSaveFunctonConfirmation(saveTypeFunc));
      dispatch(setTitleConfirmation("Are you sure you want to save ? "));
    }
    dispatch(setBodyConfirmation(`${type ? type : "new"}`));
    if (selectedIndex === -2) {
      dispatch(addNewType());
    } else if (selectedIndex >= 0) {
      dispatch(refreshDataGridType());
    }
  }, [selectedIndex, type]);

  return (
    <React.Fragment>
      <DrawerMenu
        Element={
          <Menu
            path={TypeService.getAll}
            textPath="TYPE"
            historyPathLevel={2}
          />
        }
        path="types"
      />

      <Box className="template-container__body">
        <Breadcrumb />
        <ItemSperatorLineXL />
        <Grid
          container
          className="template-container__body__action-box types-container__body__action-box"
        >
          <Grid
            item
            className="template-container__body__action-box__icons types-container__body__action-box__icons"
          >
            <ComponentError errMsg="Error">
              <MyActionMenu />
            </ComponentError>
          </Grid>
        </Grid>

        <ItemSperatorLineXL />
        <Grid
          item
          xs={12}
          className="template-container__body__property-box types-container__body__property-box"
        >
          <ComponentError errMsg="Error">
            <PropLinkTabs MyProperties={<DataGridPro />} isLinkOpen={false} />
          </ComponentError>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Type;
