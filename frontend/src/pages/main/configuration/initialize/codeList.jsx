import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { FixedSizeList } from "react-window";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Main from "../../../../layout/main/main";
import {
  ActionMenu,
  Breadcrumb,
  ItemSperatorLineXL,
  ComponentError,
  PropLinkTabs,
  ComponentErrorBody,
} from "../../../../components";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";

import ChildCodeListDataTable from "./childCodeListDataTable";
import AutoSizer from "react-virtualized-auto-sizer";
import { getParentCodeList } from "../../../../services/api/djangoApi/codeList";
import {
  setCodeListChild,
  setIndex,
  setLastItemIndex,
  setCodeListItems,
  setRowId,
  cleanCodeListItems,
} from "../../../../services/reducers/codeListChildReducer";

import MyActionMenu from "./codelistActionMenu";

function RenderRow(props) {
  const dispatch = useDispatch();
  const { data, index, style } = props;
  const selectedIndex = useSelector((state) => state.codeListChild.index);
  return (
    <ListItem
      style={style}
      key={index}
      component="div"
      disablePadding
      sx={{
        ".MuiButtonBase-root": {
          py: 0.5,
        },
      }}
    >
      <ListItemButton
        selected={selectedIndex === index}
        onClick={(event) => {
          dispatch(
            setIndex({
              index: index,
            })
          );
          dispatch(
            setCodeListChild({
              currentChild: data[index].CODE,
            })
          );
        }}
      >
        <ListItemText
          primary={`${data[index].CODE_TEXT}`}
          sx={{
            span: {
              fontSize: "12px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            },
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

const TreeMenuItem = () => {
  const dispatch = useDispatch();
  const codeListChild = useSelector((state) => state.codeListChild);
  const culture = useSelector((state) => state.lang.cultur);
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const [treeItem, setTreeItem] = React.useState(false);
  React.useEffect(() => {
    const getData = async () => {
      let data = await getParentCodeList(culture);
      setTreeItem(data);
      console.log(data);
      dispatch(cleanCodeListItems());
      var c = data.data.sort((a, b) => (a.CODE_TEXT > b.CODE_TEXT ? 1 : -1));
      c.map((e) => {
        dispatch(setCodeListItems(e.ROW_ID));
      });
      dispatch(
        setCodeListChild({
          currentChild: data.data[0].CODE,
        })
      );
      dispatch(
        setRowId({
          rowId: data.data[0].ROW_ID,
        })
      );
    };
    getData();
  }, [codeListChild.lastItem]);
  if (treeItem) {
    return (
      <Box
        sx={{
          height: isFullScreen
            ? "calc(100vh - 85px)"
            : "calc(100vh - 85px - 60px)",
        }}
      >
        <AutoSizer>
          {({ height, width }) => (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={35}
              itemCount={treeItem.data.length}
              itemData={treeItem.data.sort((a, b) =>
                a.CODE_TEXT > b.CODE_TEXT ? 1 : -1
              )}
              overscanCount={5}
            >
              {RenderRow}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    );
  }
};

const TreeMenuItems = () => {
  return (
    <ComponentError
      errMsg={
        <ComponentErrorBody
          text="Something went wrong"
          icon={<ErrorOutlineIcon />}
        />
      }
    >
      <TreeMenuItem />
    </ComponentError>
  );
};

const CodeList = () => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);

  return (
    <Grid
      container
      sx={{
        minHeight: isFullScreen ? "100vh" : "100%",
        height: "500px",
        flexWrap: "nowrap",
      }}
    >
      <DrawerMenu Element={<TreeMenuItems />} />

      <Grid
        item
        xs={12}
        sx={{
          boxShadow: 3,
          borderRadius: "3px",
          width: "500px",
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
            <Box sx={{ ml: 2.5 }}>
              <Breadcrumb />
            </Box>
          </Grid>
          <ItemSperatorLineXL />
          <Box sx={{ ml: 2 }}>
            <MyActionMenu />
          </Box>
          <ItemSperatorLineXL />
          <Grid item xs={12}>
            <ComponentError errMsg="Error">
              <PropLinkTabs
                MyProperties={<ChildCodeListDataTable />}
                isLinkOpen={false}
              />
            </ComponentError>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CodeList;
