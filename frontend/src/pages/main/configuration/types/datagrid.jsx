import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { grey } from "@mui/material/colors";
import { Stack, Paper, Typography, Grid } from "@mui/material";

import LinearProgress from "@mui/material/LinearProgress";

import { CustomToolbar } from "./datagridActionMenu";

import { CustomNoRowsOverlay } from "../../../../components";
import { columns } from "./column";
import { propColumns } from "./propColumn";
import { onChangeTypeCell } from "../../../../services/actions/type/datagrid";

function DetailPanelContent() {
  const dispatch = useDispatch();
  const onCellEditCommit = React.useMemo(
    () => (cellData) => {
      const { id, field, value } = cellData;
      dispatch(onChangeTypeCell(id, field, value));
    },
    []
  );
  return (
    <Stack
      sx={{ py: 2, height: "100%", boxSizing: "border-box" }}
      direction="column"
    >
      <Paper sx={{ flex: 1, mx: "auto", width: "90%", p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <DataGridPro
            localeText={{
              toolbarColumns: "",
              toolbarFilters: "",
              toolbarDensity: "",
              toolbarExport: "",
            }}
            density="compact"
            defaultGroupingExpansionDepth={1}
            onCellEditCommit={onCellEditCommit}
            checkboxSelection={true}
            disableSelectionOnClick={true}
            components={{
              Toolbar: CustomToolbar,
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
            }}
            columns={propColumns}
            rows={[]}
            sx={{ flex: 1 }}
            hideFooter
          />
        </Stack>
      </Paper>
    </Stack>
  );
}

export default function TreeDataWithGap() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.dataGridType.rows);

  const onCellEditCommit = React.useMemo(
    () => (cellData) => {
      const { id, field, value } = cellData;
      dispatch(onChangeTypeCell(id, field, value));
    },
    []
  );
  const getDetailPanelContent = React.useCallback(
    ({ row }) => <DetailPanelContent row={row} />,
    []
  );
  //   const [sortModel, setSortModel] = React.useState([
  //     {
  //       field: "CODE",
  //       sort: "asc",
  //     },
  //   ]);
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

            // "& .MuiDataGrid-virtualScrollerRenderZone": {
            //   "&>*:nth-of-type(1)": {
            //     "&>*:nth-of-type(1)": {
            //       svg: {
            //         display: "none",
            //       },
            //     },
            //   },
            // },
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
            // treeData
            // getTreeDataPath={getTreeDataPath}
            onCellEditCommit={onCellEditCommit}
            rows={Object.values(rows)}
            columns={columns}
            getRowId={(row) => row.ROW_ID}
            //loading={childCodeList.loading}
            //  isRowSelectable={(rowId) => rowId.id !== selectedParent.rowId}
            //checkboxSelection={true}
            disableSelectionOnClick={true}
            //onSelectionModelChange={(rowId) => dispatch(setSelectedRows(rowId))}
            //sortModel={sortModel}
            //onSortModelChange={(model) => setSortModel(model)}
            components={{
              //Toolbar: CustomToolbar,
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
            }}
            // groupingColDef={groupingColDef}
            getDetailPanelContent={getDetailPanelContent}
            disableIgnoreModificationsIfProcessingProps
          />
        </Box>
      </Box>
    </Box>
  );
}
