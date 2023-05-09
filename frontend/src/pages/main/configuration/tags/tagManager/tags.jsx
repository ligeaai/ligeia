import React from "react";
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  PropLinkTabs,
} from "../../../../../components";
import DrawerMenu from "../../../../../layout/main/asset/treeViewMenu";
import TagsActionMenu from "./tagsActionMenu";

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
const Tags = ({ isHome }) => {
  document.title = `Ligeia.ai | Tag Manager`;
  selectDrawerItem("Tag Manager");
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
        <Grid item className="template-container__body__action-box">
          <TagsActionMenu />
        </Grid>
        <ItemSperatorLineXL />
        <Grid
          item
          xs={12}
          className="template-container__body__property-box tag-manager-container__body__property-box"
        >
          <PropLinkTabs MyProperties={<Properties />} isLinkOpen={false} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Tags;
