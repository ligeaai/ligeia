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

export const CustomToolbar = () => {
  const dispatch = useDispatch();
  // const isHaveParent = useSelector(
  //   (state) => state.treeviewCodeList.selectedItem
  // );
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
              tooltip: { sx: { backgroundColor: "primary.dark" } },
            }}
          >
            <IconButton
              // disabled={!isHaveParent}
              onClick={() => {
                dispatch(addChildCodeList());
              }}
            >
              <AddBoxIcon fontSize="small" sx={{ color: "#4B4B4B" }} />
            </IconButton>
          </Tooltip>

          <Tooltip
            title={"Delete Child"}
            componentsProps={{
              tooltip: { sx: { backgroundColor: "primary.dark" } },
            }}
          >
            <IconButton
              // disabled={!isHaveParent}
              onClick={() => {
                dispatch(deleteChild());
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: "#4B4B4B" }} />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={"Show Filters"}
            componentsProps={{
              tooltip: { sx: { backgroundColor: "primary.dark" } },
            }}
          >
            <GridToolbarFilterButton
              sx={{
                color: "#4B4B4B",
                span: {
                  m: 0,
                },
              }}
            />
          </Tooltip>
          <Tooltip
            title={"Find Column"}
            componentsProps={{
              tooltip: { sx: { backgroundColor: "primary.dark" } },
            }}
          >
            <GridToolbarColumnsButton
              sx={{
                color: "#4B4B4B",
                span: {
                  m: 0,
                },
              }}
            />
          </Tooltip>
          <Tooltip
            title={"Show Density"}
            componentsProps={{
              tooltip: { sx: { backgroundColor: "primary.dark" } },
            }}
          >
            <GridToolbarDensitySelector
              sx={{
                color: "#4B4B4B",
                span: {
                  m: 0,
                },
              }}
            />
          </Tooltip>
          <Tooltip
            title={"Show Export"}
            componentsProps={{
              tooltip: { sx: { backgroundColor: "primary.dark" } },
            }}
          >
            <GridToolbarExport
              sx={{
                color: "#4B4B4B",
                span: {
                  m: 0,
                },
              }}
            />
          </Tooltip>
        </Grid>
      </Grid>
    </GridToolbarContainer>
  );
};
