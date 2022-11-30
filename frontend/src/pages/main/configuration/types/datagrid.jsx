import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { grey } from "@mui/material/colors";

import LinearProgress from "@mui/material/LinearProgress";

import { CustomNoRowsOverlay } from "../../../../components";
import { columns } from "./column";
import { propColumns } from "./propColumn";
import { onChangeTypeCell } from "../../../../services/actions/type/datagrid";
import DetailPanelContent from "./propertyDataGrid";

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
            disableSelectionOnClick={true}
            components={{
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
