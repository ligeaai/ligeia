import React from "react";
import { MenuItem } from "@mui/material";
import {
  GridEditInputCell,
  GridEditDateCell,
  GridEditBooleanCell,
  GridEditSingleSelectCell,
  GridCellCheckboxRenderer,
  GridBooleanCell,
} from "@mui/x-data-grid-pro";
export const MyTextField = (params) => {
  //console.log(params.row);
  if (params.row.PROPERTY_TYPE === "TEXT") {
    return <GridEditInputCell {...params} />;
  } else if (params.row.PROPERTY_TYPE === "HISTORY") {
    return (
      <GridEditDateCell
        type="date"
        value={params.row[params.field]}
        {...params}
      />
    );
  } else if (params.row.PROPERTY_TYPE === "NUMBER") {
    return <GridEditInputCell type="number" {...params} />;
  } else if (params.row.PROPERTY_TYPE === "INT") {
    return <GridEditInputCell type="number" {...params} />;
  } else if (params.row.PROPERTY_TYPE === "BOOL") {
    return <GridEditBooleanCell checked={false} type="checkbox" {...params} />;
  } else if (params.row.PROPERTY_TYPE === "CODE") {
    return <GridEditSingleSelectCell {...params} initialOpen={false} />;
  } else {
    return <GridEditInputCell {...params} />;
  }
};
