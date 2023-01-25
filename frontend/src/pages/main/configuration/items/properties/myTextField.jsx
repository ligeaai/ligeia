import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, MenuItem, Button } from "@mui/material";
import { Select } from "../../../../../components";

import CodelistService from "../../../../../services/api/codeList";
import { editDataGridCell } from "../../../../../services/actions/item/itemDataGrid";
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
  const dispatch = useDispatch();
  const CULTURE = useSelector((state) => state.lang.cultur);
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
    const body = JSON.stringify({ CULTURE, CODE_LIST: params.row.CODE_LIST });

    try {
      let res = await CodelistService.getItemPropCode(body);
      let data = [
        {
          ROW_ID: "",
          CODE: "",
          CODE_TEXT: "",
          LIST_TYPE: "",
          CULTURE: "",
          LAYER_NAME: "",
        },
      ];
      let sortedResponse = res.data.sort((a, b) =>
        a.CODE_TEXT > b.CODE_TEXT ? 1 : -1
      );
      sortedResponse.map((e) => {
        if (e.CODE_TEXT) {
          data.push(e);
        }
      });
      setValues(data);

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return (
    <Box
      onMouseUp={handleClick}
      {...params}
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    >
      <Select
        values={values}
        valuesPath={"ROW_ID"}
        dataTextPath={"CODE_TEXT"}
        handleChangeFunc={(value) => {
          dispatch(editDataGridCell(params.id, params.field, value));
        }}
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
      error={true}
      className={"errorhandling"}
    />
  );
};

export const MyTextField = (params) => {
  if (params.row.PROPERTY_TYPE === "TEXT") {
    console.log(params.row);
    return <GridEditInputCell {...params} error={true} />;
  } else if (
    params.row.PROPERTY_TYPE === "HISTORY" ||
    params.row.PROPERTY_TYPE === "DATE"
  ) {
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
  } else if (
    params.row.PROPERTY_TYPE === "HISTORY" ||
    params.row.PROPERTY_TYPE === "DATE"
  ) {
    var d = params.row[params.field].getDate();
    var m = params.row[params.field].getMonth();
    m += 1;
    var y = params.row[params.field].getFullYear();
    var newdate = d + "." + m + "." + y;
    return <Box>{newdate}</Box>;
  } else {
    return <Box> asd{params.row[params.field]}</Box>;
  }
};
