import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Checkbox } from "@mui/material";
import { Select } from "../../../../../components";

import CodelistService from "../../../../../services/api/codeList";
import { editDataGridCell } from "../../../../../services/actions/item/itemDataGrid";
import { GridEditInputCell, GridEditDateCell } from "@mui/x-data-grid-pro";

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
        if (params.value) {
          let res = await CodelistService.details(body);
          setValues(res.data);
          return Promise.resolve(res.data);
        }
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
      className={`item-container__body__property-box__datagrid__single-select ${
        params.row[params.field] === "" && params.row.MANDATORY === "True"
          ? "errorhandling"
          : ""
      }`}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    >
      <Select
        values={values}
        disabled={!params.colDef.editable}
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
      disabled={!params.colDef.editable}
      className={
        params.row[params.field] === "" && params.row.MANDATORY === "True"
          ? "errorhandling"
          : ""
      }
    />
  );
};

export const MyTextField = (params) => {
  const dispatch = useDispatch();
  if (params.row.PROPERTY_TYPE === "TEXT") {
    return (
      <GridEditInputCell
        {...params}
        disabled={!params.colDef.editable}
        className={
          params.row[params.field] === "" && params.row.MANDATORY === "True"
            ? "errorhandling"
            : ""
        }
      />
    );
  } else if (
    params.row.PROPERTY_TYPE === "HISTORY" ||
    params.row.PROPERTY_TYPE === "DATE"
  ) {
    return (
      <GridEditDateCell
        type="date"
        disabled={!params.colDef.editable}
        value={params.row[params.field]}
        {...params}
        className={
          params.row[params.field] === "" && params.row.MANDATORY === "True"
            ? "errorhandling"
            : ""
        }
      />
    );
  } else if (params.row.PROPERTY_TYPE === "NUMBER") {
    return <InputCell {...params} />;
  } else if (params.row.PROPERTY_TYPE === "INT") {
    return <InputCell {...params} />;
  } else if (params.row.PROPERTY_TYPE === "BOOL") {
    return (
      <Checkbox
        {...params}
        disabled={!params.colDef.editable}
        onChange={(value) => {
          dispatch(
            editDataGridCell(params.id, params.field, value.target.checked)
          );
        }}
        checked={params.value}
        className={`item-container__body__property-box__datagrid__checkbox ${
          params.row[params.field] === "" && params.row.MANDATORY === "True"
            ? "errorhandling"
            : ""
        }`}
      />
    );
  } else if (params.row.PROPERTY_TYPE === "CODE") {
    return <SingleSelectCell {...params} />;
  } else {
    return (
      <GridEditInputCell
        {...params}
        disabled={!params.colDef.editable}
        className={
          params.row[params.field] === "" && params.row.MANDATORY === "True"
            ? "errorhandling"
            : ""
        }
      />
    );
  }
};
