import React from "react";

import { Box, Grid } from "@mui/material";
import { ItemSperatorLine } from "../../../../components";

import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import {
  setLoaderTrue,
  setLoaderFalse,
} from "../../../../services/actions/loader";
import { loadType } from "../../../../services/api/type/type";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
const columns = [
  { field: "PROPERTY_NAME", headerName: "Property", width: 200 },
  {
    field: "PROP_GRP",
    headerName: "Category",
    width: 100,
  },
  {
    field: "MANDATORY",
    headerName: "Mandatory",
    type: "boolean",
    width: 100,
  },
  {
    field: "editable",
    headerName: "",
    width: 150,
    editable: true,
  },
];

const SeperatorLineVertical = () => {
  return (
    <Box
      sx={{
        height: "26px",
        width: "2px",
        backgroundColor: "#4B4B4B",
        marginX: "2px",
      }}
    />
  );
};

const DataGridDemo = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = React.useState(false);
  React.useEffect(() => {
    dispatch(setLoaderTrue);
    const getData = async () => {
      let data = await loadType("COMPANY");
      console.log(data);
      setRows(data);
      dispatch(setLoaderFalse());
    };
    getData();
  }, []);
  if (rows) {
    return (
      <Box sx={{ width: "604px" }}>
        <DataGrid
          rows={rows.data.TYPE["TYPE PROPERTY COLUMNS"].TYPE}
          columns={columns}
          autoHeight={true}
          hideFooter={true}
          getRowId={(row) => row.LABEL_ID}
        />
      </Box>
    );
  }
};

const FilterBox = () => {
  return (
    <Grid container sx={{ alignItems: "center", mt: 1 }}>
      <SearchIcon />
      <AddIcon />
      <SeperatorLineVertical />
      <MenuIcon />
      <MenuIcon />
      <MenuIcon fontSize="small" />
      <SeperatorLineVertical />
      <TuneOutlinedIcon />
      <FileDownloadOutlinedIcon />
    </Grid>
  );
};

const properties = () => {
  return (
    <Box
      sx={{
        boxShadow: 3,
        m: 0.5,
        mb: 1,
        mr: 1,
        width: "100%",
        height: "100%",
        borderRadius: "3px",
      }}
    >
      <Grid container sx={{ justifyContent: "flex-end" }}>
        <Grid item>
          <FilterBox />
        </Grid>
      </Grid>
      <ItemSperatorLine />
      <Grid container sx={{ pl: 0.5 }}>
        <Grid item xs={12} md={7}>
          <DataGridDemo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default properties;
