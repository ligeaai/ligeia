import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Divider, Button } from "@mui/material";

import { GridColumnMenu } from "@mui/x-data-grid-pro";

import { deleteColum } from "../../../../../services/actions/item/itemDataGrid";

const CustomColumnMenu = (props) => {
  const dispatch = useDispatch();
  const { hideMenu, currentColumn, ...other } = props;
  const deleteColumn = () => {
    dispatch(deleteColum(currentColumn.field));
  };
  const isNew = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const permission = useSelector(
    (state) => state.auth.user?.role?.PROPERTY_ID?.ITEM.DELETE
  );
  return (
    <Box>
      <GridColumnMenu
        hideMenu={hideMenu}
        currentColumn={currentColumn}
        {...other}
      />
      <Divider light />

      <Button
        color="error"
        sx={{
          width: "100%",
          pl: 1.5,
          fontSize: "16px",
          textTransform: "capitalize",
          display:
            currentColumn.cellClassName !== "myRenderCell"
              ? "none"
              : isNew === -2
              ? "auto"
              : !permission
              ? "none"
              : "auto",
        }}
        onClick={deleteColumn}
      >
        Delete Column
      </Button>
    </Box>
  );
};

export default CustomColumnMenu;
