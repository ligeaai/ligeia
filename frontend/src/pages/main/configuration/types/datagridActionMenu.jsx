import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";

import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";

import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  deleteProperty,
  addNewProperty,
} from "../../../../services/actions/type/datagrid";

export const CustomToolbar = () => {
  const dispatch = useDispatch();

  return (
    <GridToolbarContainer>
      <Tooltip title={"Add Child"}>
        <IconButton
          onClick={() => {
            dispatch(addNewProperty());
          }}
        >
          <AddBoxIcon
            fontSize="small"
            className="types-property-action-menu-icon"
          />
        </IconButton>
      </Tooltip>

      <Tooltip title={"Delete Child"}>
        <IconButton
          onClick={() => {
            dispatch(deleteProperty());
          }}
        >
          <DeleteIcon
            fontSize="small"
            className="types-property-action-menu-icon"
          />
        </IconButton>
      </Tooltip>
      <Tooltip title={"Show Filters"}>
        <GridToolbarFilterButton className="types-property-action-menu-icon" />
      </Tooltip>
      <Tooltip title={"Find Column"}>
        <GridToolbarColumnsButton className="types-property-action-menu-icon" />
      </Tooltip>
      <Tooltip title={"Show Density"}>
        <GridToolbarDensitySelector className="types-property-action-menu-icon" />
      </Tooltip>
      <Tooltip title={"Show Export"}>
        <GridToolbarExport className="types-property-action-menu-icon" />
      </Tooltip>
    </GridToolbarContainer>
  );
};
