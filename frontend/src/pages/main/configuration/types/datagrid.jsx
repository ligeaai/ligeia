import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { grey } from "@mui/material/colors";

import LinearProgress from "@mui/material/LinearProgress";

import { CustomNoRowsOverlay } from "../../../../components";

import { onChangeCell } from "../../../../services/actions/type/datagrid";
import DetailPanelContent from "./propertyDataGrid";

function TreeDataWithGap() {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.dataGridType.rows);
  const [columns, setColumns] = React.useState([]);
  const refresh = useSelector((state) => state.dataGridType.refresh);
  const onCellEditCommit = React.useMemo(
    () => (cellData) => {
      const { id, field, value } = cellData;
      dispatch(onChangeCell(id, field, value, 0));
    },
    []
  );
  const getDetailPanelContent = React.useCallback(
    ({ row }) => <DetailPanelContent row={row} />,
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
        minWidth: 150,
      },
      {
        field: "TYPE_CLASS",
        headerName: "Type Class",
        editable: true,
        width: widthMax("TYPE_CLASS"),
        minWidth: 150,
      },
      {
        field: "LABEL_ID",
        headerName: "Label id",
        editable: true,
        width: widthMax("LABEL_ID"),
        minWidth: 150,
      },
      {
        field: "CHANGE_INTERVAL",
        headerName: "Thange Interval",
        editable: true,
        width: widthMax("CHANGE_INTERVAL"),
        minWidth: 150,
      },
      {
        field: "LAYER_NAME",
        headerName: "Layer Name",
        editable: true,
        width: widthMax("LAYER_NAME"),
        minWidth: 150,
      },
      {
        field: "HIDDEN",
        headerName: "Hidden",
        editable: true,
        width: widthMax("HIDDEN"),
        minWidth: 150,
      },
      {
        field: "BASE_TYPE",
        headerName: "Base Type",
        editable: true,
        width: widthMax("BASE_TYPE"),
        minWidth: 150,
      },
      {
        field: "CODE_LIST_TYPE",
        headerName: "Code List Type",
        editable: true,
        width: widthMax("CODE_LIST_TYPE"),
        minWidth: 150,
      },
      {
        field: "IS_QUICK_LINK",
        headerName: "Is Quick Link",
        editable: true,
        width: widthMax("IS_QUICK_LINK"),
        minWidth: 150,
      },
      {
        field: "PROP_TBL_NAME",
        headerName: "Property Table Name",
        editable: true,
        width: widthMax("PROP_TBL_NAME"),
        minWidth: 150,
      },
      {
        field: "BASE_TBL_NAME",
        headerName: "Base Table Name",
        editable: true,
        width: widthMax("BASE_TBL_NAME"),
        minWidth: 150,
      },
      {
        field: "TAG_TBL_NAME",
        headerName: "Tag Table Name",
        editable: true,
        width: widthMax("TAG_TBL_NAME"),
        minWidth: 150,
      },
      {
        field: "LAST_UPDT_USER",
        headerName: "Last Update User",
        editable: false,
        width: widthMax("LAST_UPDT_USER"),
        minWidth: 150,
      },
      {
        field: "LAST_UPDT_DATE",
        headerName: "Last Update Date",
        editable: false,
        width: widthMax("LAST_UPDT_DATE"),
        minWidth: 150,
      },
    ]);
  }, [refresh]);
  return (
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
          "& .MuiDataGrid-cell--editing": {
            backgroundColor: "background.secondary",
          },
        }}
      >
        <DataGridPro
          density="compact"
          defaultGroupingExpansionDepth={1}
          hideFooter={true}
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
          getDetailPanelHeight={() =>
            "calc(100vh - 60px - 36px - 16px - 60px - 78px)"
          }
          autoPageSize={true}
          getDetailPanelContent={getDetailPanelContent}
          disableIgnoreModificationsIfProcessingProps
          //disableColumnResize={true}
        ></DataGridPro>
      </Box>
    </Box>
  );
}
export default React.memo(TreeDataWithGap);
