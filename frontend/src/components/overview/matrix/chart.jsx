import React from "react";
import $ from "jquery";
import Box from "@mui/material/Box";
import DataGrid from "../../datagrid/dataGrid";
import "../../../assets/styles/components/overview/matrixWidget.scss";
import DataGridCell from "./dataGridCell";

const Matrix = ({ highchartProps }) => {
  const [columns, setColumns] = React.useState([]);
  const [rows, setRows] = React.useState([]);

  const valueFormatter = (data) => {
    return `${parseFloat(
      parseFloat(data).toFixed(
        highchartProps?.["Decimal Places"] === ""
          ? 3
          : highchartProps?.["Decimal Places"]
      )
    )} `;
  };
  const handlePropChange = () => {
    $(".matrix-widget-container__val").css({
      "font-size":
        highchartProps?.["Value Font Size"] !== ""
          ? highchartProps?.["Value Font Size"] + "px"
          : "12px",
      display: highchartProps?.["Show Measurement"] ? "inline-block" : "none",
    });

    $(".matrix-widget-container__uom").css({
      "font-size":
        highchartProps?.["UOM Font Size"] !== ""
          ? highchartProps?.["UOM Font Size"] + "px"
          : "12px",
      display: highchartProps?.["Show Unit of Measurement"]
        ? "inline-block"
        : "none",
    });
  };
  React.useEffect(() => {
    let column = [{ field: "tag", headerName: " ", flex: 2 }];
    console.log(highchartProps?.["Show Measurement"]);
    Promise.all(
      highchartProps?.Assets?.map((e) => {
        column.push({
          field: e[0],
          headerName: e[1],
          flex: 1,
          headerClassName: "matrix-widget-container__datagrid__header",
          renderCell: (params) => {
            console.log(highchartProps?.["Show Measurement"]);
            return (
              <DataGridCell
                {...params}
                handlePropChange={handlePropChange}
                valueFormatter={valueFormatter}
                refreshSec={highchartProps["Widget Refresh (seconds)"]}
              />
            );
          },
        });
      })
    );

    setColumns(column);

    let shortnames = {};
    Promise.all(
      highchartProps?.Inputs?.map((e, i) => {
        if (e.SHORT_NAME === null) {
          shortnames[e.NAME] = false;
          highchartProps.Inputs[i].SHORT_NAME = e.NAME;
        } else {
          shortnames[e.SHORT_NAME] = false;
        }
      })
    );

    let row = [];

    Promise.all(
      Object.keys(shortnames).map((e, i) => {
        let temp = highchartProps?.Inputs?.filter((a) => a.SHORT_NAME === e);
        let rowItem = {
          id: i,
          tag: temp[0].SHORT_NAME,
        };
        temp.map((e) => {
          rowItem = {
            ...rowItem,
            [e.ITEM_ID]: e.TAG_ID,
            [e.ITEM_ID + "UOM"]: e?.UOM ? e.UOM : "",
          };
        });
        row.push(rowItem);
      })
    );
    setRows(row);
  }, [highchartProps.Inputs]);
  React.useEffect(() => {
    handlePropChange();
  }, [highchartProps]);

  React.useEffect(() => {
    highchartProps?.Inputs.map((e) => {
      $(`.matrix-widget-container__${e.TAG_ID}__val`).html(
        valueFormatter(
          parseFloat($(`.matrix-widget-container__${e.TAG_ID}__val`).html())
        )
      );
    });
  }, [highchartProps?.["Decimal Places"]]);
  return (
    <Box
      className={`matrix-widget-container`}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "& .matrix-widget-container__datagrid__header": {
          fontSize: highchartProps?.["Header Font Size"]
            ? highchartProps?.["Header Font Size"] + "px"
            : "14px",
        },
      }}
    >
      <DataGrid
        columns={columns}
        rows={rows}
        components={{}}
        // orientation="horizontal"
        // autoHeight
      />
    </Box>
  );
};

export default Matrix;
