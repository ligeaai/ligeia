import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { Stack, Paper } from "@mui/material";

import LinearProgress from "@mui/material/LinearProgress";

import { CustomToolbar } from "./datagridActionMenu";

import { CustomNoRowsOverlay } from "../../../../components";
import {
  onChangeCell,
  setSelectedRows,
} from "../../../../services/actions/type/datagrid";
const DetailPanelContent = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.dataGridType.propertyRows);
  const [columns, setColumns] = React.useState([]);
  const onCellEditCommit = React.useMemo(
    () => (cellData) => {
      const { id, field, value } = cellData;
      dispatch(onChangeCell(id, field, value, 1));
    },
    []
  );
  const widthMax = (type) => {
    let max = Math.max(
      ...Object.keys(rows).map((e) => {
        return rows[e][type]?.length === undefined ? 0 : rows[e][type]?.length;
      })
    );

    return Number.isNaN(max) ? 150 : max * 10 + 24;
  };
  React.useEffect(() => {
    setColumns([
      {
        field: "TYPE",
        headerName: "Type",
        editable: true,
        width: widthMax("TYPE"),
        minWidth: 100,
      },
      {
        field: "PROPERTY_NAME",
        headerName: "Property Name",
        editable: true,
        width: widthMax("PROPERTY_NAME"),
        minWidth: 100,
      },
      {
        field: "CODE_LIST",
        headerName: "Code List",
        editable: true,
        width: widthMax("CODE_LIST"),
        minWidth: 100,
      },
      {
        field: "MANDATORY",
        headerName: "Mandatory",
        editable: true,
        width: widthMax("MANDATORY"),
        minWidth: 100,
      },
      {
        field: "LABEL_ID",
        headerName: "Label id",
        editable: true,
        width: widthMax("LABEL_ID"),
        minWidth: 100,
      },

      {
        field: "PROP_GRP",
        headerName: "Property Group",
        editable: true,
        width: widthMax("PROP_GRP"),
        minWidth: 100,
      },
      {
        field: "PROPERTY_TYPE",
        headerName: "Property Type",
        editable: true,
        width: widthMax("PROPERTY_TYPE"),
        minWidth: 100,
      },
      {
        field: "LAYER_NAME",
        headerName: "Layer Name",
        editable: true,
        width: widthMax("LAYER_NAME"),
        minWidth: 100,
      },
      {
        field: "SORT_ORDER",
        headerName: "Sort Order",
        editable: true,
        type: "number",
        headerAlign: "left",
        align: "left",
        width: widthMax("SORT_ORDER"),
        minWidth: 100,
      },
    ]);
  }, []);
  return (
    <Stack className="types-property-container" direction="column">
      <Paper className="types-property-container__paper">
        <Stack
          direction="column"
          spacing={1}
          className="types-property-container__paper__datagrid-box"
        >
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
            columns={columns}
            rows={Object.values(rows)}
            sx={{ flex: 1 }}
            hideFooter
          />
        </Stack>
      </Paper>
    </Stack>
  );
};

export default React.memo(DetailPanelContent);
