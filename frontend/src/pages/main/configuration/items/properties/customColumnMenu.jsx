import React from "react";
import { useDispatch } from "react-redux";
import { Box, Divider, Button } from "@mui/material";

import { GridColumnMenuContainer, GridColumnMenu } from "@mui/x-data-grid-pro";

import { deleteColum } from "../../../../../services/actions/item/itemDataGrid";

const CustomColumnMenu = (props) => {
  const dispatch = useDispatch();
  const { hideMenu, currentColumn, ...other } = props;
  const deleteColumn = () => {
    dispatch(deleteColum(currentColumn.field));
  };
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
        }}
        onClick={deleteColumn}
      >
        Delete Column
      </Button>
    </Box>
  );
};

export default CustomColumnMenu;
