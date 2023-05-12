import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  PropLinkTabs,
} from "../../../../../components";
import DrawerMenu from "../../../../../layout/main/asset/treeViewMenu";
import TagsActionMenu from "./tagsActionMenu";
import ImportActionMenu from "../tagImport/actionMenu";
import Properties from "./propertiesEditor";

import {
  cleanAllTags,
  loadTagsLabel,
  cleanSaveValue,
} from "../../../../../services/actions/tags/tags";
import { selectTreeViewItem } from "../../../../../services/actions/treeview/treeview";
import Menu from "./treeMenu";
import { selectDrawerItem } from "../../../../../services/actions/drawerMenu/drawerMenu";
import "../../../../../assets/styles/layouts/template.scss";

import Import from "../tagImport/body";

const Tags = ({ isHome }) => {
  document.title = `Ligeia.ai | Tag Manager`;
  selectDrawerItem("Tag Manager");
  const page = useSelector((state) => state.propLinkTap?.page);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isHome) {
      dispatch(selectTreeViewItem(-3, "", 3));
      dispatch(cleanSaveValue());
    }
  }, [isHome]);
  React.useEffect(() => {
    dispatch(loadTagsLabel());
    return () => {
      dispatch(cleanAllTags());
    };
  }, []);
  return (
    <React.Fragment>
      <DrawerMenu Element={<Menu />} path="tags" />
      <Grid
        item
        xs={12}
        className="template-container__body tag-manager-container__body"
      >
        <Breadcrumb />
        <ItemSperatorLineXL />
        <Grid
          container
          className="template-container__body__action-box template-container__body__action-box"
        >
          {page === "Import" ? <ImportActionMenu /> : <TagsActionMenu />}
        </Grid>
        <ItemSperatorLineXL />
        <Grid
          item
          xs={12}
          className="template-container__body__property-box tag-manager-container__body__property-box"
        >
          <PropLinkTabs
            MyProperties={<Properties />}
            isLinkOpen={false}
            isImportOpen={true}
            Import={<Import />}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Tags;
