import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { grey } from "@mui/material/colors";

import LinearProgress from "@mui/material/LinearProgress";
import ConfirmDataGrid from "./confirmDataGrid";
import { CustomToolbar } from "./codeListActionMenu";
import {
  onChangeCell,
  setSelectedRows,
  refreshDataGridCodelist,
  saveCodeList,
  addNewCodeListItemSchema,
} from "../../../../../services/actions/codelist/datagrid";
import { CustomNoRowsOverlay } from "../../../../../components";
import {
  setBodyConfirmation,
  setSaveFunctonConfirmation,
  setTitleConfirmation,
} from "../../../../../services/actions/confirmation/historyConfirmation";
import { useIsMount } from "../../../../../hooks/useIsMount";
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
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.dataGridCodeList.rows);
  const columns = useSelector((state) => state.dataGridCodeList.columns);
  const selectedParent = useSelector(
    (state) => state.treeview.selectedItem.ROW_ID
  );
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const rowId = useSelector((state) => state.treeview.selectedItem.ROW_ID);
  const onCellEditCommit = React.useMemo(
    () => (cellData) => {
      const { id, field, value } = cellData;
      dispatch(onChangeCell(id, field, value));
    },
    []
  );

  React.useEffect(() => {
    if (selectedIndex === -2) {
      dispatch(addNewCodeListItemSchema());
    }
  }, [selectedIndex]);
  React.useEffect(() => {
    if (isMount) {
      dispatch(setSaveFunctonConfirmation(saveCodeList));
      dispatch(
        setTitleConfirmation("Are you sure you want to save this code list ? ")
      );
      dispatch(setBodyConfirmation(<ConfirmDataGrid />));
    } else if (selectedIndex !== -2) {
      dispatch(refreshDataGridCodelist());
    }
  }, [rowId]);
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
            "& .super-app-theme--cell": {
              backgroundColor: grey[200],
            },
            "& .MuiDataGrid-cellContent": { fontSize: "12px" },
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
                    span: {
                      fontSize: "14px",
                    },
                    "&>*:nth-of-type(2)": {
                      display: "none",
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
            isRowSelectable={(rowId) => rowId.id !== selectedParent.rowId}
            checkboxSelection={true}
            disableSelectionOnClick={true}
            onSelectionModelChange={(rowId) => dispatch(setSelectedRows(rowId))}
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
