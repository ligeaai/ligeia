import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Stack, Paper } from "@mui/material";

import LinearProgress from "@mui/material/LinearProgress";

import { CustomToolbar } from "./datagridActionMenu";

import { CustomNoRowsOverlay } from "../../../../components";
import { propColumns } from "./propColumn";
import {
  onChangeCell,
  setSelectedRows,
} from "../../../../services/actions/type/datagrid";
const DetailPanelContent = () => {
  const dispatch = useDispatch();
  const propertyRows = useSelector((state) => state.dataGridType.propertyRows);
  const onCellEditCommit = React.useMemo(
    () => (cellData) => {
      const { id, field, value } = cellData;
      dispatch(onChangeCell(id, field, value, 1));
    },
    []
  );

  return (
    <Stack
      sx={{ height: "100%", px: "50px", boxSizing: "border-box" }}
      direction="column"
    >
      <Paper sx={{ flex: 1, width: "100%", p: 1 }}>
        <Stack direction="column" spacing={1} sx={{ height: 1 }}>
          <DataGridPro
            componentsProps={{
              basePopper: {
                sx: {
                  ".MuiDataGrid-columnsPanel": {
                    span: {
                      fontSize: "14px",
                    },
                  },
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                  },
                  "& .MuiButtonBase-root": {
                    fontSize: "14px",
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
            getRowId={(row) => row.ROW_ID}
            density="compact"
            defaultGroupingExpansionDepth={1}
            onCellEditCommit={onCellEditCommit}
            checkboxSelection={true}
            disableSelectionOnClick={true}
            onSelectionModelChange={(rowId) => dispatch(setSelectedRows(rowId))}
            components={{
              Toolbar: CustomToolbar,
              NoRowsOverlay: CustomNoRowsOverlay,
              LoadingOverlay: LinearProgress,
            }}
            columns={propColumns}
            rows={Object.values(propertyRows)}
            sx={{ flex: 1 }}
            hideFooter
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default DetailPanelContent;
