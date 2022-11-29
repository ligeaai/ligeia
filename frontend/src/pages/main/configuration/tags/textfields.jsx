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

const TransactionPropertySelect = ({ defaultValue }) => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.tags.items);
  const selectedValue = useSelector(
    (state) => state.tagsTreeview.selectedItem.selectedIndex
  );

  const handleChangeFunc = async (value) => {
    dispatch(addSaveTagValue("TO_ITEM_ID", value));
    dispatch(addSaveTagValue("ITEM_ID", value));
    dispatch(addSaveTagValue("TRANSACTION_PROPERTY", value));
  };
  React.useEffect(() => {
    console.log(selectedValue);
    dispatch({
      type: "SET_TAG_SAVE_VALUES",
      payload: { key: "TO_ITEM_ID", value: defaultValue },
    });
  }, [defaultValue, selectedValue]);
  return (
    <Select
      disabled={values.length === 0 ? true : false}
      //errFunc={errFunc}
      values={values}
      valuesPath="ITEM_ID"
      defaultValue={defaultValue}
      dataTextPath="NAME"
      handleChangeFunc={handleChangeFunc}
    />
  );
};

const TransactionTypeSelect = ({ row, defaultValue }) => {
  const dispatch = useDispatch();
  const [values, setvalues] = React.useState([]);

  const setTagSaveVal = (key, value) => {
    dispatch({
      type: "SET_TAG_SAVE_VALUES",
      payload: { key: key, value: value },
    });
  };

  const loadItems = async (value) => {
    try {
      let res = await instance.get(
        `/item/details/${value.toLowerCase()}`,
        config()
      );
      setTagSaveVal("TO_ITEM_TYPE", value);
      setTagSaveVal("TRANSACTION_TYPE", value);
      dispatch({
        type: "LOAD_ITEMS_FOR_TAGLINKS",
        payload: res.data,
      });
    } catch {
      dispatch({
        type: "LOAD_ITEMS_FOR_TAGLINKS",
        payload: [],
      });
      setTagSaveVal(("TO_ITEM_ID", ""));
      setTagSaveVal(("ITEM_ID", ""));
      setTagSaveVal(("TRANSACTION_PROPERTY", ""));
    }
  };

  const handleChangeFunc = async (value) => {
    try {
      let res = await instance.get(
        `/item/details/${value.toLowerCase()}`,
        config()
      );
      dispatch(addSaveTagValue("TO_ITEM_TYPE", value));
      dispatch(addSaveTagValue("TRANSACTION_TYPE", value));
      dispatch({
        type: "LOAD_ITEMS_FOR_TAGLINKS",
        payload: res.data,
      });
    } catch {
      dispatch({
        type: "LOAD_ITEMS_FOR_TAGLINKS",
        payload: [],
      });
      dispatch(addSaveTagValue("TO_ITEM_ID", ""));
      dispatch(addSaveTagValue("ITEM_ID", ""));
      dispatch(addSaveTagValue("TRANSACTION_PROPERTY", ""));
    }
  };
  React.useEffect(() => {
    var ignore = false;
    const myFunc = async () => {
      let res = await instance.get("/tags/links/", config());
      if (!ignore) {
        setvalues(res.data);
        loadItems(defaultValue);
      }
    };

    myFunc();
    return () => {
      ignore = true;
    };
  }, [defaultValue]);
  return (
    <Select
      //errFunc={errFunc}
      values={values}
      valuesPath="TO_TYPE"
      defaultValue={defaultValue}
      dataTextPath="TO_TYPE"
      handleChangeFunc={handleChangeFunc}
    />
  );
};

const TextFields = (props) => {
  const dispatch = useDispatch();
  const { row } = props;
  const handleChangeFunc = (value) => {
    dispatch(addSaveTagValue(row.PROPERTY_NAME, value));
  };
  const historyHandleChangeFunc = (value) => {
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
