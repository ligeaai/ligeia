import React from "react";
import { useSelector } from "react-redux";

import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material";

import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { ComponentError, ComponentErrorBody } from "../../components";

const RenderRow = (props) => {
  const {
    data,
    index,
    style,
    selectFunc = () => {},
    selectedIndex = 0,
    primaryText = "",
  } = props;

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
          selectFunc(index);
        }}
      >
        <ListItemText
          primary={`${data[index][primaryText]}`}
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
};

const TreeMenuItem = (myProps) => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const { items = [] } = myProps;
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
            itemCount={items.length}
            itemData={items}
            overscanCount={5}
          >
            {(props) =>
              RenderRow({
                ...props,
                selectFunc: myProps.selectFunc,
                selectedIndex: myProps.selectedIndex,
                primaryText: myProps.primaryText,
              })
            }
          </FixedSizeList>
        )}
      </AutoSizer>
    </Box>
  );
};

export const TreeMenu = (props) => {
  return (
    <ComponentError
      errMsg={
        <ComponentErrorBody
          text="Something went wrong"
          icon={<ErrorOutlineIcon />}
        />
      }
    >
      <TreeMenuItem {...props} />
    </ComponentError>
  );
};
