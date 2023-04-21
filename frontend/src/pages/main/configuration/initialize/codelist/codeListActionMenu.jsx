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
  addChildCodeList,
  deleteChild,
} from "../../../../../services/actions/codelist/datagrid";
import {
  isCreated,
  isDeleted,
} from "../../../../../services/utils/permissions";
export const CustomToolbar = () => {
  const dispatch = useDispatch();

  return (
    <GridToolbarContainer>
      <Grid
        container
        sx={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <Grid item sx={{ alignItems: "center", displat: "flex" }}>
          <Tooltip
            title={"Add Child"}
            componentsProps={{
              tooltip: { sx: { backgroundColor: "icon.success" } },
            }}
          >
            <IconButton
              disabled={!dispatch(isCreated("CODE_LIST"))}
              onClick={() => {
                dispatch(addChildCodeList());
              }}
            >
              <AddBoxIcon fontSize="small" sx={{ color: "icon.secondary" }} />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={"Delete Child"}
            componentsProps={{
              tooltip: { sx: { backgroundColor: "icon.success" } },
            }}
          >
            <IconButton
              disabled={!dispatch(isDeleted("CODE_LIST"))}
              onClick={() => {
                dispatch(deleteChild());
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: "icon.secondary" }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={"Show Filters"}
            componentsProps={{
              tooltip: { sx: { backgroundColor: "icon.success" } },
            }}
          >
            <GridToolbarFilterButton />
          </Tooltip>
          <Tooltip
            title={"Find Column"}
            componentsProps={{
              tooltip: { sx: { backgroundColor: "icon.success" } },
            }}
          >
            <GridToolbarColumnsButton />
          </Tooltip>
          <Tooltip
            title={"Show Density"}
            componentsProps={{
              tooltip: { sx: { backgroundColor: "icon.success" } },
            }}
          >
            <GridToolbarDensitySelector />
          </Tooltip>
          <Tooltip
            title={"Show Export"}
            componentsProps={{
              tooltip: { sx: { backgroundColor: "icon.success" } },
            }}
          >
            <GridToolbarExport />
          </Tooltip>
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
};
