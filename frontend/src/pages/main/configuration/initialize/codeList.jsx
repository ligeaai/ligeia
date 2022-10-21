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

import Main from "../../../../layout/main/main";
import {
  ActionMenu,
  Breadcrumb,
  ItemSperatorLineXL,
  ComponentError,
  PropLinkTabs,
} from "../../../../components";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";

import ChildCodeList from "./childCodeList";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  setLoaderFalse,
  setLoaderTrue,
} from "../../../../services/actions/loader";
import { getParentCodeList } from "../../../../services/api/djangoApi/codeList";
import {
  setCodeListChild,
  setIndex,
  setLastItemIndex,
} from "../../../../services/reducers/codeListChildReducer";

const TreeMenuItem = () => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const codeListChildIndex = useSelector((state) => state.codeListChild.index);
  function RenderRow(props) {
    const { data, index, style } = props;
    useEffect(() => {
      setSelectedIndex(codeListChildIndex);
      dispatch(
        setCodeListChild({
          currentChild: data[codeListChildIndex].CODE,
        })
      );
    }, [codeListChildIndex]);
    useEffect(() => {
      dispatch(
        setLastItemIndex({
          lastItem: data.length,
        })
      );
    }, []);
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

  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const culture = useSelector((state) => state.lang.cultur);
  const [treeItem, setTreeItem] = React.useState(false);
  React.useEffect(() => {
    dispatch(setLoaderTrue());
    const getData = async () => {
      let data = await getParentCodeList(culture);
      setTreeItem(data);
      dispatch(setLoaderFalse());
    };
    getData();
  }, []);
  if (treeItem) {
    console.log(treeItem.data);
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

const CodeListBody = () => {
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
      <ComponentError errMsg="Error">
        <DrawerMenu Element={TreeMenuItem()} />
      </ComponentError>

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
            <Box sx={{ ml: 2.5 }}>
              <Breadcrumb />
            </Box>
          </Grid>
          <ItemSperatorLineXL />
          <Grid item xs={12}>
            <ComponentError errMsg="Error">
              <PropLinkTabs MyProperties={<ChildCodeList />} />
            </ComponentError>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const CodeList = () => {
  return <Main Element={CodeListBody()} delSearchBar={true} />;
};

export default CodeList;
