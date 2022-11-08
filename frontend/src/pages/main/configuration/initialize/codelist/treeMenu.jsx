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
import AutoSizer from "react-virtualized-auto-sizer";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { ComponentError, ComponentErrorBody } from "../../../../../components";

import {
  loadTreeviwItemCodelist,
  selectTreeViewItemCoedlist,
} from "../../../../../services/actions/codelist/treeview";

function RenderRow(props) {
  const dispatch = useDispatch();
  const { data, index, style } = props;
  const selectedIndex = useSelector(
    (state) => state.treeviewCodelist.selectedItem.selectedIndex
  );
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
          dispatch(selectTreeViewItemCoedlist(index));
        }}
      >
        <ListItemText
          primary={`${data[index].CODE_TEXT}`}
          sx={{
            span: {
              fontSize: "14px",
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
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const treeviewCodelist = useSelector(
    (state) => state.treeviewCodelist.treeMenuItem
  );

  React.useEffect(() => {
    dispatch(loadTreeviwItemCodelist());
  }, []);
  return (
    <Box
      sx={{
        height: isFullScreen
          ? "calc(100vh - 85px )"
          : "calc(100vh - 85px - 60px - 4px)",
        minHeight: "416px",
      }}
    >
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={35}
            itemCount={treeviewCodelist.length}
            itemData={treeviewCodelist}
            overscanCount={5}
          >
            {RenderRow}
          </FixedSizeList>
        )}
      </AutoSizer>
    </Box>
  );
};

export const TreeMenuItems = () => {
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
