import React from "react";
import { useSelector } from "react-redux";
import { Box, MenuItem } from "@mui/material";
import { Select } from "../../../../../components";

import CodelistService from "../../../../../services/api/codeList";

import {
  GridEditInputCell,
  GridEditDateCell,
  GridEditBooleanCell,
  GridEditSingleSelectCell,
  GridCellCheckboxRenderer,
  GridBooleanCell,
  GridCell,
} from "@mui/x-data-grid-pro";

const SingleSelectCell = (params) => {
  const [values, setValues] = React.useState([
    {
      ROW_ID: "",
      CODE: "",
      CODE_TEXT: "",
      LIST_TYPE: "",
      CULTURE: "",
      LAYER_NAME: "",
    },
  ]);
  React.useEffect(() => {
    async function myFunc() {
      const body = JSON.stringify({ ROW_ID: params.value });
      try {
        let res = await CodelistService.details(body);
        setValues(res.data);
        return Promise.resolve(res.data);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    if (params.value !== "") {
      myFunc();
    }
  }, []);

  const handleClick = async () => {
    const body = JSON.stringify({ ROW_ID: params.row.ROW_ID });
    try {
      let res = await CodelistService.getCodelistDetail(body);
      console.log(res.data);
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return (
    <Box
      className="selectItems"
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
      onClick={handleClick}
    >
      <Select
        {...params}
        values={values}
        valuesPath={"ROW_ID"}
        dataTextPath={"CODE_TEXT"}
        handleChangeFunc={() => {}}
        defaultValue={`${params.value}`}
      />
    </Box>
  );
};

const InputCell = (params) => {
  return (
    <GridEditInputCell
      type="number"
      onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
      {...params}
    />
  );
};

export const MyTextField = (params) => {
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
    return <InputCell {...params} />;
  } else if (params.row.PROPERTY_TYPE === "INT") {
    return <InputCell {...params} />;
  } else if (params.row.PROPERTY_TYPE === "BOOL") {
    return <GridEditBooleanCell checked={false} type="checkbox" {...params} />;
  } else if (params.row.PROPERTY_TYPE === "CODE") {
    return <SingleSelectCell {...params} />;
  } else {
    return <GridEditInputCell {...params} />;
  }
};

export const MyTextFieldRender = (params) => {
  if (params.row.PROPERTY_TYPE === "BOOL") {
    return (
      <GridBooleanCell disabled checked={false} type="checkbox" {...params} />
    );
  } else if (params.row.PROPERTY_TYPE === "HISTORY") {
    var d = params.row[params.field].getDate();
    var m = params.row[params.field].getMonth();
    m += 1;
    var y = params.row[params.field].getFullYear();
    var newdate = d + "." + y + "." + m;
    return <Box>{newdate}</Box>;
  } else {
    return <Box>{params.row[params.field]}</Box>;
  }
};
