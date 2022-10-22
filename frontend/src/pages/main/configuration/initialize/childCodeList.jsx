import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";

import { ComponentError, ComponentErrorBody } from "../../../../components";

import {
  setLoaderTrue,
  setLoaderFalse,
} from "../../../../services/actions/loader";
import {
  getChildCodeList,
  deleteCodeList,
} from "../../../../services/api/djangoApi/codeList";
import { setConfirmation } from "../../../../services/reducers/confirmation";

const DataGridDemo = () => {
  const dispatch = useDispatch();
  const culture = useSelector((state) => state.lang.cultur);
  const [rows, setRows] = React.useState(false);
  const codeListChild = useSelector((state) => state.codeListChild);
  const [checkboxSelection, setCheckboxSelection] = React.useState([]);
  const columns = [
    {
      field: "CODE_TEXT",
      headerName: "Code Text",
      width: 200,
      cellClassName: "super-app-theme--cell",
    },
  ];
  const deleteChildAgreeFunc = async () => {
    dispatch(setLoaderTrue);
    setCheckboxSelection([]);
    await rows.data.map((e) => {
      if (checkboxSelection.indexOf(e.CODE) !== -1) {
        deleteCodeList(e.LIST_TYPE, culture, e.CODE);
      }
    });
    setRows(false);
    let data = await getChildCodeList(codeListChild.currentChild, culture);
    setRows(data);

    dispatch(setLoaderFalse);
  };
  const deleteChild = () => {
    dispatch(
      setConfirmation({
        title: "Are you sure you want to delete the following items?",
        body: "Here, the items to be deleted will appear in the data grid.",
        agreefunction: deleteChildAgreeFunc,
      })
    );
  };

  React.useEffect(() => {
    setRows(false);
    dispatch(setLoaderTrue);
    const getData = async () => {
      let data = await getChildCodeList(codeListChild.currentChild, culture);
      setRows(data);
      dispatch(setLoaderTrue);
    };
    getData();
  }, [codeListChild]);

  const StyledGridOverlay = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    "& .ant-empty-img-1": {
      fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
    },
    "& .ant-empty-img-2": {
      fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
    },
    "& .ant-empty-img-3": {
      fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
    },
    "& .ant-empty-img-4": {
      fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
    },
    "& .ant-empty-img-5": {
      fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
      fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
    },
  }));
  function CustomNoRowsOverlay() {
    return (
      <StyledGridOverlay>
        <svg
          width="120"
          height="100"
          viewBox="0 0 184 152"
          aria-hidden
          focusable="false"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(24 31.67)">
              <ellipse
                className="ant-empty-img-5"
                cx="67.797"
                cy="106.89"
                rx="67.797"
                ry="12.668"
              />
              <path
                className="ant-empty-img-1"
                d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
              />
              <path
                className="ant-empty-img-2"
                d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
              />
              <path
                className="ant-empty-img-3"
                d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
              />
            </g>
            <path
              className="ant-empty-img-3"
              d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
            />
            <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
              <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
              <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
            </g>
          </g>
        </svg>
        <Box sx={{ mt: 1 }}>No Rows</Box>
      </StyledGridOverlay>
    );
  }

  function CustomToolbar() {
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
              <IconButton onClick={() => {}}>
                <AddBoxIcon fontSize="small" sx={{ color: "#4B4B4B" }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={"Delete Child"}
              componentsProps={{
                tooltip: { sx: { backgroundColor: "primary.dark" } },
              }}
            >
              <IconButton onClick={deleteChild}>
                <DeleteIcon fontSize="small" sx={{ color: "#4B4B4B" }} />
              </IconButton>
            </Tooltip>
            <GridToolbarFilterButton
              sx={{
                color: "#4B4B4B",
              }}
            />
            <GridToolbarColumnsButton
              sx={{
                color: "#4B4B4B",
              }}
            />
            <GridToolbarDensitySelector
              sx={{
                color: "#4B4B4B",
              }}
            />
            <GridToolbarExport
              sx={{
                color: "#4B4B4B",
              }}
            />
          </Grid>
        </Grid>
      </GridToolbarContainer>
    );
  }

  if (rows) {
    return (
      <DataGrid
        checkboxSelection={true}
        rows={rows.data}
        columns={columns}
        hideFooter={true}
        components={{
          Toolbar: CustomToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        getRowId={(row) => row.CODE}
        onSelectionModelChange={(rowId) => setCheckboxSelection(rowId)}
      />
    );
  }
};

const childCodeList = () => {
  return (
    <Box
      sx={{
        width: "874px",
        minHeight: "calc(500px - 36px - 16px - 40px)",
        height: "calc(100vh - 60px - 36px - 16px - 44px)",
        "& .super-app-theme--cell": {
          backgroundColor: grey[200],
        },
        m: 0.5,
      }}
    >
      <ComponentError
        errMsg={
          <ComponentErrorBody
            text="Something went wrong"
            icon={<ErrorOutlineIcon />}
          />
        }
      >
        <DataGridDemo />
      </ComponentError>
    </Box>
  );
};

export default childCodeList;
