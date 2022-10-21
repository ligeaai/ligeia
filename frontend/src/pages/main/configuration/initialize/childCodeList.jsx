import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";

import {
  setLoaderTrue,
  setLoaderFalse,
} from "../../../../services/actions/loader";
import {
  getChildCodeList,
  deleteCodeListChild,
} from "../../../../services/api/djangoApi/codeList";
import { ActionMenu } from "../../../../components";
import { setIndex } from "../../../../services/reducers/codeListChildReducer";
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
  const saveGoPrev = () => {
    dispatch(
      setIndex({
        index: codeListChild.index - 1,
      })
    );
  };
  const saveGoNext = () => {
    dispatch(
      setIndex({
        index: codeListChild.index + 1,
      })
    );
  };
  const deleteChild = async () => {
    dispatch(setLoaderTrue);
    await rows.data.map((e) => {
      if (checkboxSelection.indexOf(e.CODE) !== -1) {
        deleteCodeListChild(e.LIST_TYPE, culture, e.CODE);
      }
    });
    setRows(false);
    let data = await getChildCodeList(codeListChild.currentChild, culture);
    console.log(rows);
    setRows(data);
    console.log(rows);
    setCheckboxSelection([]);
    dispatch(setLoaderFalse);
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

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Grid
          container
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Grid item>
            <GridToolbarFilterButton />
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
          </Grid>
          <Grid item>
            <ActionMenu
              saveGoPrev={saveGoPrev}
              saveGoNext={saveGoNext}
              deleteChild={deleteChild}
            />
          </Grid>
        </Grid>
      </GridToolbarContainer>
    );
  }

  if (rows) {
    return (
      <Box
        sx={{
          width: "874px",
          minHeight: "calc(500px - 36px - 16px - 8px)",
          height: "calc(100vh - 60px - 36px - 16px - 8px)",
          "& .super-app-theme--cell": {
            backgroundColor: grey[200],
          },
          button: { color: "#4B4B4B" },
          m: 0.5,
        }}
      >
        <DataGrid
          checkboxSelection={true}
          rows={rows.data}
          columns={columns}
          hideFooter={true}
          components={{ Toolbar: CustomToolbar }}
          getRowId={(row) => row.CODE}
          onSelectionModelChange={(rowId) => setCheckboxSelection(rowId)}
        />
      </Box>
    );
  }
};

const childCodeList = () => {
  return <DataGridDemo />;
};

export default childCodeList;
