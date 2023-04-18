import React from "react";
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  PropLinkTabs,
  MainBox,
} from "../../../../../components";
import DrawerMenu from "../../../../../layout/main/asset/treeViewMenu";
import TagsActionMenu from "./tagsActionMenu";

import Properties from "./properties";

import {
  cleanAllTags,
  loadTagsLabel,
  cleanSaveValue,
} from "../../../../../services/actions/tags/tags";
import { selectTreeViewItem } from "../../../../../services/actions/treeview/treeview";
import Menu from "./treeMenu";
import { selectDrawerItem } from "../../../../../services/actions/drawerMenu/drawerMenu";

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
    <MainBox>
      <Grid item>
        <DrawerMenu Element={<Menu />} path="tags" />
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
          <Breadcrumb />
          <ItemSperatorLineXL />
          <Grid
            item
            sx={{
              ml: 1.5,
              display: "flex",
              alignItems: "center",
              marginY: "2px",
            }}
          >
            <TagsActionMenu />
          </Grid>
          <ItemSperatorLineXL />
          <Grid item xs={12} sx={{ mt: 1, mr: 1 }}>
            <PropLinkTabs
              MyProperties={<Properties></Properties>}
              isLinkOpen={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </MainBox>
  );
};

export default Tags;
