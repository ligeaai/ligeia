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
  loadTreeviewItemCodelist,
  selectTreeViewItemCoedlist,
} from "../../../../../services/actions/codelist/treeview";

import { saveAndMoveCodeList } from "../../../../../services/actions/codelist/datagrid";

import {
  setConfirmation,
  setExtraBtn,
} from "../../../../../services/reducers/confirmation";

import ConfirmDataGrid from "./confirmDataGrid";

function RenderRow(props) {
  const dispatch = useDispatch();
  const { data, index, style } = props;
  const selectedIndex = useSelector(
    (state) => state.treeviewCodelist.selectedItem.selectedIndex
  );
  const changedRows = useSelector(
    (state) => state.dataGridCodeList.changedRows
  );
  const deletedRows = useSelector(
    (state) => state.dataGridCodeList.deletedRows
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
          if (changedRows.length !== 0 || deletedRows.length !== 0) {
            dispatch(
              setConfirmation({
                title: "Are you sure you want to save this code list?",
                body: <ConfirmDataGrid />,
                agreefunction: async () => {
                  dispatch(saveAndMoveCodeList(index));
                },
              })
            );
            dispatch(
              setExtraBtn({
                extraBtnText: "Don't save go",
                extrafunction: () => {
                  dispatch(selectTreeViewItemCoedlist(index));
                },
              })
            );
          } else {
            dispatch(selectTreeViewItemCoedlist(index));
          }
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
    dispatch(loadTreeviewItemCodelist());
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
