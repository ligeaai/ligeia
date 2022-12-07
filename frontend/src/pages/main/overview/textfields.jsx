import React from "react";
import Grid from "@mui/material/Grid";

import { makeStyles } from "@mui/styles";

import {
  Select,
  DatePicker,
  MyTextField,
  MyCheckBox,
  MyNumberTextField,
  MyMultilineTextField,
} from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { instance, config } from "../../../../services/baseApi";
import { addSaveTagValue } from "../../../../services/actions/tags/tags";
import axios from "axios";
import { setIsActiveConfirmation } from "../../../../services/actions/confirmation/historyConfirmation";
import { useIsMount } from "../../../../hooks/useIsMount";

const TextFields = (props) => {
  const dispatch = useDispatch();
  const { row } = props;
  const handleChangeFunc = (value) => {
    dispatch(setIsActiveConfirmation(true));
    dispatch(addSaveTagValue(row.PROPERTY_NAME, value));
  };
  const historyHandleChangeFunc = (value) => {
    dispatch(setIsActiveConfirmation(true));
    var d = value.getDate();
    var m = value.getMonth();
    m += 1;
    var y = value.getFullYear();
    var newdate = y + "-" + m + "-" + d;
    dispatch(addSaveTagValue(row.PROPERTY_NAME, newdate));
  };

  const defaultValue = useSelector(
    (state) => state.tags.saveValues[row.PROPERTY_NAME]
  );
  var myDefaultValue = defaultValue ? defaultValue : undefined;
  const errFunc = () => {
    return (
      (myDefaultValue === undefined || myDefaultValue === "") &&
      (row.MANDATORY === "False" ? false : true)
    );
  };
  if (row.PROPERTY_TYPE === "CODE") {
    if (row.CODE) {
      var values = [{ ROW_ID: "", CODE_TEXT: "" }];
      const sortedCode = row.CODE.sort((a, b) =>
        a.CODE_TEXT > b.CODE_TEXT ? 1 : -1
      );
      values = values.concat(sortedCode);
      return (
        <Select
          errFunc={errFunc}
          values={values}
          valuesPath="ROW_ID"
          defaultValue={myDefaultValue}
          dataTextPath="CODE_TEXT"
          handleChangeFunc={handleChangeFunc}
        />
      );
    } else {
      //console.log(row);
      return <>CODE NULL</>;
    }
  }
  if (row.PROPERTY_TYPE === "DATETIME") {
    return (
      <DatePicker
        errFunc={errFunc}
        time={myDefaultValue ? myDefaultValue : null}
        onChangeFunc={historyHandleChangeFunc}
      />
    );
  }
  if (row.PROPERTY_TYPE === "TEXT") {
    if (row.PROPERTY_NAME !== "DESCRIPTION") {
      return (
        <MyTextField
          errFunc={errFunc}
          defaultValue={myDefaultValue}
          handleChangeFunc={handleChangeFunc}
        />
      );
    }
    return <MyMultilineTextField />;
  }
  if (row.PROPERTY_TYPE === "BOOL") {
    return (
      <MyCheckBox
        errFunc={errFunc}
        defaultValue={myDefaultValue}
        handleChangeFunc={handleChangeFunc}
      />
    );
  }
  if (row.PROPERTY_TYPE === "NUMBER" || row.PROPERTY_TYPE === "DURATION") {
    return (
      <MyNumberTextField
        errFunc={errFunc}
        defaultValue={myDefaultValue}
        handleChangeFunc={handleChangeFunc}
      />
    );
  }
  if (row.PROPERTY_TYPE === "ITEM") {
    if (row.PROPERTY_NAME === "TRANSACTION_TYPE") {
      return <TransactionTypeSelect row={row} defaultValue={myDefaultValue} />;
    } else if (row.PROPERTY_NAME === "TRANSACTION_PROPERTY") {
      return <TransactionPropertySelect defaultValue={myDefaultValue} />;
    }
  }
  console.log(row.PROPERTY_TYPE);
  return <>{row.PROPERTY_TYPE}</>;
};

export default TextFields;
