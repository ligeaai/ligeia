import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import { grey } from "@mui/material/colors";

import LinearProgress from "@mui/material/LinearProgress";

import { CustomNoRowsOverlay } from "./customNoRowOwerlay";
import { CustomToolbar } from "./codeListActionMenu";
import { onChangeCell } from "../../../../../services/actions/codelist/datagrid";
const getTreeDataPath = (row) => row.HIERARCHY;

const groupingColDef = {
  headerName: "",
  hideDescendantCount: true,
  valueFormatter: () => "",
  width: 50,
  // minWidth: 0,

  resizable: false,
};

export default function TreeDataWithGap() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.dataGridCodeList.rows);
  const columns = useSelector((state) => state.dataGridCodeList.columns);

  const onCellEditCommit = (cellData) => {
    const { id, field, value } = cellData;
    dispatch(onChangeCell(id, field, value));
  };

  const [sortModel, setSortModel] = React.useState([
    {
      field: "CODE",
      sort: "asc",
    },
  ]);

  return (
    <Box>
      <Box
        sx={{
          m: 0.5,
          "& .super-app-theme--cell": {
            backgroundColor: grey[200],
          },

          button: {
            minWidth: "36px",
            height: "36px",
            borderRadius: "50px",
          },
        }}
      >
        <Box
          sx={{
            minHeight: "calc(500px - 36px - 16px - 40px )",
            height: "calc(100vh - 60px - 36px - 16px - 60px)",
            width: "100%",
            "& .MuiInputBase-input": {
              padding: "0px important",
            },
            "& .MuiDataGrid-cellContent": {
              fontSize: "16px",
            },
            "& .super-app-theme--cell": {
              backgroundColor: grey[200],
            },

            "& .MuiDataGrid-virtualScrollerRenderZone": {
              "&>*:nth-of-type(1)": {
                "&>*:nth-of-type(1)": {
                  svg: {
                    display: "none",
                  },
                },
              },
            },
          }}
        >
          <DataGridPro
            componentsProps={{
              basePopper: {
                sx: {
                  ".MuiDataGrid-columnsPanel": {
                    "&>*:nth-of-type(2)": {
                      display: "none",
                    },
                  },
                },
              },
            }}
            localeText={{
              toolbarColumns: "",
              toolbarFilters: "",
              toolbarDensity: "",
              toolbarExport: "",
            }}
            density="compact"
            defaultGroupingExpansionDepth={1}
            hideFooter={true}
            treeData
            onCellEditCommit={onCellEditCommit}
            rows={Object.values(rows)}
            columns={columns}
            getTreeDataPath={getTreeDataPath}
            getRowId={(row) => row.ROW_ID}
            //loading={childCodeList.loading}
            //isRowSelectable={(rowId) => rowId.id !== codeListChild.rowId}
            checkboxSelection={true}
            disableSelectionOnClick={true}
            //onSelectionModelChange={(rowId) => (myCheckboxSelection = rowId)}
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            components={{
              Toolbar: CustomToolbar,
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
            }}
            groupingColDef={groupingColDef}
            disableIgnoreModificationsIfProcessingProps
          />
        </Box>
      </Box>
    </Box>
  );
}
