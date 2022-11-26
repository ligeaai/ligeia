import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Divider, Box } from "@mui/material";

import {
  MyBox,
  Breadcrumb,
  ItemSperatorLineXL,
  PropLinkTabs,
} from "../../../../components";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";
import TagsActionMenu from "./tagsActionMenu";
import DateBreak from "./dateBreak";
import Properties from "./properties";

import {
  cleanAllTags,
  loadTagsLabel,
  forceCleanAll,
} from "../../../../services/actions/tags/tags";
import {
  cleanTreeMenuSelect,
  loadTreeView,
} from "../../../../services/actions/tags/tagsTreeview";

import { TreeMenuItems } from "./treeMenu";
const Tags = ({ isHome }) => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  React.useEffect(() => {
    if (isHome) {
      dispatch(cleanAllTags());
      dispatch({ type: "SELECT_TREEVIEW_ITEM_TAGS", payload: {} });
      dispatch({ type: "LOAD_TAGS_LABEL", payload: [] });
      // dispatch(cleanTreeMenuSelect());
      dispatch({
        type: "TOGGLE_CHANGES_TAGS",
        payload: false,
      });
    } else {
      dispatch(loadTagsLabel());
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
      <Grid item sx={{ minHeight: "500px", boxShadow: 3, mr: 0.5 }}>
        <DrawerMenu Element={<TreeMenuItems></TreeMenuItems>} />
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
          <Grid
            item
            sx={{
              ml: 1.5,
              backgroundColor: "myBackgroundColor",
              height: "42px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TagsActionMenu />
          </Grid>
          {/* <Divider
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
          <Grid
            item
            sx={{
              mr: 1.5,
              backgroundColor: "myBackgroundColor",
              height: "42px",
            }}
          >
            <DateBreak />
          </Grid> */}
          <ItemSperatorLineXL />
          <Grid item xs={12} sx={{ mt: 1, mr: 1 }}>
            <PropLinkTabs
              MyProperties={<Properties></Properties>}
              isLinkOpen={false}
              // MyLinks={<Links></Links>}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Tags;
