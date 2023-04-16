import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { DataGridPro } from "@mui/x-data-grid-pro";

import Box from "@mui/material/Box";

import { CustomToolbar, CustomNoRowsOverlay } from "../../../../../components";
import CustomColumnMenu from "./customColumnMenu";
import {
  loadItemRowsDataGrid,
  editDataGridCell,
  saveItem,
} from "../../../../../services/actions/item/itemDataGrid";

import {
  setBodyConfirmation,
  setSaveFunctonConfirmation,
  setTitleConfirmation,
} from "../../../../../services/actions/confirmation/historyConfirmation";

const MyDataGrid = () => {
  const dispatch = useDispatch();
  const columns = useSelector((state) => state.itemDataGrid.columns);
  const rows = useSelector((state) => state.itemDataGrid.rows);
  const typeRow = useSelector((state) => state.itemDataGrid.typeRows);
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const itemId = useSelector((state) => state.treeview.selectedItem.ITEM_ID);
  const name = useSelector(
    (state) => state.treeview.selectedItem.PROPERTY_STRING
  );
  const [sortModel, setSortModel] = React.useState([
    {
      field: "SORT_ORDER",
      sort: "asc",
    },
  ]);
  const pinnedRows = {
    top: [rows.HISTORY],
    bottom: [],
  };
  React.useEffect(() => {
    dispatch(setSaveFunctonConfirmation(saveItem));
    dispatch(setTitleConfirmation("Are you sure you want to save this ? "));
    dispatch(setBodyConfirmation(`${name ? name : "new"}`));
    if (selectedIndex !== -3) dispatch({ type: "CLEAR_COLUMN_ITEM" });
    if (selectedIndex !== -2 && selectedIndex !== -3) {
      dispatch(loadItemRowsDataGrid());
    }
  }, [itemId, name, selectedIndex, typeRow]);
  const onCellEditCommit = (cellData) => {
    const { id, field, value } = cellData;
    let myId = id;
    if (id === "") {
      //todo find better way
      myId = "HISTORY";
    }
    dispatch(editDataGridCell(myId, field, value));
  };
  if (Object.keys(rows).length !== 0) {
    return (
      <DataGridPro
        sx={{
          boxSizing: "border-box",
          maxWidth: "100%",
          width: `calc(521px + ${150 * (Object.keys(columns).length - 4)}px)`,
          ".MuiDataGrid-pinnedRows": {
            zIndex: 2,
          },
          ".MuiDataGrid-cell": {
            backgroundColor: "background.main",
          },
          ".super-app-theme--cell": {
            backgroundColor: "background.secondary",
          },
          ".css-1w5m2wr-MuiDataGrid-virtualScroller": {
            overflowY: "scroll",
          },
          "& .MuiDataGrid-cell--editing": {
            backgroundColor: "background.secondary",
          },
          ".myRenderCell:has(.errorhandling)": {
            border: "1px solid red",
          },
        }}
        componentsProps={{
          basePopper: {
            sx: {
              ".MuiDataGrid-columnsPanel": {
                span: {
                  fontSize: "14px",
                },
                "&>*:nth-of-type(n+5)": {
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
        rows={Object.values(rows)}
        density="compact"
        columns={Object.values(columns)}
        hideFooter={true}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        // loading={loading}
        components={{
          Toolbar: CustomToolbar,
          ColumnMenu: CustomColumnMenu,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        getRowId={(row) => row.PROPERTY_NAME}
        pinnedRows={pinnedRows}
        experimentalFeatures={{ rowPinning: true }}
        onCellEditCommit={onCellEditCommit}
        disableSelectionOnClick={true}
        disableVirtualization={true}
      />
    );
  } else {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <CustomNoRowsOverlay text="No Rows and Columns" />
      </Box>
    );
  }
};

export default React.memo(MyDataGrid);
