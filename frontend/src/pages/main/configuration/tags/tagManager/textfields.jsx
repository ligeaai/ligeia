import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import {
  Select,
  DatePicker,
  MyTextField,
  MyCheckBox,
  MyNumberTextField,
  MyMultilineTextField,
  LoadingComponent,
} from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { instance, config } from "../../../../../services/baseApi";
import { addSaveTagValue } from "../../../../../services/actions/tags/tags";
import { setIsActiveConfirmation } from "../../../../../services/actions/confirmation/historyConfirmation";
const TagName = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.tags.items);
  const transaction_prop = useSelector(
    (state) => state.tags.saveValues.TRANSACTION_PROPERTY
  );
  const shortName = useSelector((state) => state.tags.saveValues.SHORT_NAME);
  const name = useSelector((state) => state.tags.saveValues.NAME);
  let asset =
    items.length > 0 && transaction_prop
      ? items.filter((e) => e.ITEM_ID === transaction_prop)[0]?.PROPERTY_STRING
      : "";
  React.useEffect(() => {
    dispatch(
      addSaveTagValue(
        "NAME",
        `${asset ? asset : ""}.${shortName ? shortName : ""}`
      )
    );
  }, [transaction_prop, asset]);
  const handleChangeFunc = (e) => {
    dispatch(setIsActiveConfirmation(true));
    dispatch(addSaveTagValue("SHORT_NAME", e));
    dispatch(addSaveTagValue("NAME", `${asset}.${e}`));
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <Grid
          container
          className="tag-manager-container__body__property-box__prop-item__box__select-box"
        >
          <Grid
            item
            className="tag-manager-container__body__property-box__prop-item__box__body tag-manager-container__body__property-box__prop-item__box__label"
          >
            Short Name
          </Grid>
          <Grid
            item
            className={
              "tag-manager-container__body__property-box__prop-item__box__label-field"
            }
          >
            <MyTextField
              defaultValue={shortName}
              handleChangeFunc={handleChangeFunc}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid
          container
          className="tag-manager-container__body__property-box__prop-item__box__select-box"
        >
          <Grid
            item
            className="tag-manager-container__body__property-box__prop-item__box__body tag-manager-container__body__property-box__prop-item__box__label"
          >
            Tag Name
          </Grid>
          <Grid
            item
            className={
              "tag-manager-container__body__property-box__prop-item__box__label-field"
            }
          >
            <MyTextField disabled={true} defaultValue={name} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const Uom = () => {
  const dispatch = useDispatch();
  const [qt, setqt] = React.useState([]);
  const [uom, setuom] = React.useState([]);
  const qtDefault = useSelector(
    (state) => state.tags.saveValues.UOM_QUANTITY_TYPE
  );
  const tagId = useSelector((state) => state.treeview.selectedItem.TAG_ID);
  const umDefault = useSelector((state) => state.tags.saveValues.UOM_NAME);
  const uomDefault = useSelector((state) => state.tags.saveValues.UOM);

  React.useEffect(() => {
    setuom([]);
    const myFunc = async () => {
      try {
        let res = await instance.get("/uom-unit/type/", config());
        setqt(res.data);
      } catch {}
    };
    myFunc();
  }, [tagId]);
  React.useEffect(() => {
    const myFunc = async () => {
      try {
        const body = JSON.stringify({ QUANTITY_TYPE: qtDefault });
        let res = await instance.post("/uom-unit/name/", body, config());
        setuom(res.data);
      } catch {}
    };
    myFunc();
  }, [qtDefault]);
  const handleChangeFunc = (e) => {
    dispatch(setIsActiveConfirmation(true));
    dispatch(addSaveTagValue("UOM_QUANTITY_TYPE", e));
  };
  return (
    <>
      <Grid item xs={12} md={6}>
        <Grid
          container
          className="tag-manager-container__body__property-box__prop-item__box__select-box"
        >
          <Grid
            item
            className="tag-manager-container__body__property-box__prop-item__box__body tag-manager-container__body__property-box__prop-item__box__label"
          >
            Quantity Type
          </Grid>
          <Grid
            item
            className={
              "tag-manager-container__body__property-box__prop-item__box__label-field"
            }
          >
            <Select
              values={qt}
              valuesPath="QUANTITY_TYPE"
              dataTextPath="QUANTITY_TYPE"
              defaultValue={qtDefault}
              handleChangeFunc={handleChangeFunc}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid
          container
          className="tag-manager-container__body__property-box__prop-item__box__select-box"
        >
          <Grid
            item
            className="tag-manager-container__body__property-box__prop-item__box__body tag-manager-container__body__property-box__prop-item__box__label"
          >
            Uom Name
          </Grid>
          <Grid
            item
            className={
              "tag-manager-container__body__property-box__prop-item__box__label-field"
            }
          >
            <Select
              values={uom}
              valuesPath="NAME"
              dataTextPath="NAME"
              defaultValue={umDefault}
              disabled={true}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid
          container
          className="tag-manager-container__body__property-box__prop-item__box__select-box"
        >
          <Grid
            item
            className="tag-manager-container__body__property-box__prop-item__box__body tag-manager-container__body__property-box__prop-item__box__label"
          >
            Unit Of Measure
          </Grid>
          <Grid
            item
            className={
              "tag-manager-container__body__property-box__prop-item__box__label-field"
            }
          >
            <Select
              values={uom}
              valuesPath="CATALOG_SYMBOL"
              dataTextPath="CATALOG_SYMBOL"
              defaultValue={uomDefault}
              disabled={uom.length === 0}
              handleChangeFunc={(e) => {
                dispatch(setIsActiveConfirmation(true));
                dispatch(addSaveTagValue("UOM", e));
                dispatch(
                  addSaveTagValue(
                    "UOM_NAME",
                    uom.filter((a) => a.CATALOG_SYMBOL === e)[0].NAME
                  )
                );
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const TransactionTypeSelect = () => {
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const culture = useSelector((state) => state.lang.cultur);
  const defaultValue = useSelector(
    (state) => state.tags.saveValues.TRANSACTION_TYPE
  );
  const dispatch = useDispatch();
  const [values, setvalues] = React.useState([]);

  const loadItems = async (value) => {
    try {
      let res = await instance.get(
        `/item/details/${value.toLowerCase()}`,
        config()
      );
      dispatch({
        type: "LOAD_ITEMS_FOR_TAGLINKS",
        payload: res.data,
      });
    } catch {
      dispatch({
        type: "LOAD_ITEMS_FOR_TAGLINKS",
        payload: [],
      });
    }
  };

  const handleChangeFunc = async (value) => {
    loadItems(value);
    dispatch(addSaveTagValue("TRANSACTION_TYPE", value));
  };
  React.useEffect(() => {
    var ignore = false;
    const body = JSON.stringify({ CULTURE: culture });
    const myFunc = async () => {
      try {
        let res = await instance.post("/tags/links/", body, config());
        if (!ignore) {
          setvalues(res.data);
          loadItems(defaultValue);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (selectedIndex !== -3) {
      myFunc();
    }

    return () => {
      ignore = true;
    };
  }, [defaultValue, selectedIndex]);
  return (
    <Select
      //errFunc={errFunc}
      values={values}
      valuesPath="TO_TYPE"
      defaultValue={defaultValue}
      dataTextPath="SHORT_LABEL"
      handleChangeFunc={handleChangeFunc}
    />
  );
};

const TransactionPropertySelect = () => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.tags.items);
  const defaultValue = useSelector((state) => state.tags.saveValues.ITEM_ID);

  const handleChangeFunc = async (value) => {
    dispatch(setIsActiveConfirmation(true));
    dispatch(addSaveTagValue("ITEM_ID", value));
    dispatch(addSaveTagValue("TRANSACTION_PROPERTY", value));
  };

  return (
    <Select
      disabled={values.length === 0 ? true : false}
      //errFunc={errFunc}
      values={values}
      valuesPath="ITEM_ID"
      defaultValue={defaultValue}
      dataTextPath="PROPERTY_STRING"
      handleChangeFunc={handleChangeFunc}
    />
  );
};

const TextFields = (props) => {
  const dispatch = useDispatch();
  const { row } = props;
  const handleChangeFunc = (value) => {
    dispatch(setIsActiveConfirmation(true));
    dispatch(addSaveTagValue(row?.PROPERTY_NAME, value));
  };
  const historyHandleChangeFunc = (value) => {
    dispatch(setIsActiveConfirmation(true));
    var d = value.getDate();
    var m = value.getMonth();
    m += 1;
    var y = value.getFullYear();
    var newdate = y + "-" + m + "-" + d;
    dispatch(addSaveTagValue(row?.PROPERTY_NAME, newdate));
  };

  const defaultValue = useSelector((state) =>
    state.tags.saveValues
      ? state.tags.saveValues[row?.PROPERTY_NAME]
      : "loading"
  );
  var myDefaultValue = defaultValue ? defaultValue : undefined;
  const errFunc = () => {
    return (
      (myDefaultValue === undefined || myDefaultValue === "") &&
      (row?.MANDATORY === "False" ? false : true)
    );
  };
  if (myDefaultValue === "loading") {
    return (
      <Box className="tag-manager-loading">
        <LoadingComponent></LoadingComponent>
      </Box>
    );
  }
  if (row?.PROPERTY_TYPE === "CODE") {
    if (row?.CODE) {
      var values = [{ ROW_ID: "", CODE_TEXT: "" }];
      const sortedCode = row.CODE.sort((a, b) =>
        a.CODE_TEXT > b.CODE_TEXT ? 1 : -1
      );
      values = values.concat(sortedCode);
      if (row?.PROPERTY_NAME === "UOM") {
        return <Uom />;
      }
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
      return <>CODE NULL</>;
    }
  }
  if (row?.PROPERTY_TYPE === "DATETIME") {
    return (
      <DatePicker
        errFunc={errFunc}
        time={myDefaultValue ? myDefaultValue : null}
        onChangeFunc={historyHandleChangeFunc}
      />
    );
  }
  if (row?.PROPERTY_TYPE === "TEXT") {
    if (row?.PROPERTY_NAME === "NAME") {
      return <TagName></TagName>;
    }
    if (row?.PROPERTY_NAME !== "DESCRIPTION") {
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
  if (row?.PROPERTY_TYPE === "BOOL") {
    return (
      <MyCheckBox
        errFunc={errFunc}
        defaultValue={myDefaultValue}
        handleChangeFunc={handleChangeFunc}
      />
    );
  }
  if (row?.PROPERTY_TYPE === "NUMBER" || row?.PROPERTY_TYPE === "DURATION") {
    return (
      <MyNumberTextField
        errFunc={errFunc}
        defaultValue={myDefaultValue}
        handleChangeFunc={handleChangeFunc}
      />
    );
  }
  if (row?.PROPERTY_TYPE === "ITEM") {
    if (row?.PROPERTY_NAME === "TRANSACTION_TYPE") {
      return <TransactionTypeSelect row={row} defaultValue={myDefaultValue} />;
    } else if (row?.PROPERTY_NAME === "TRANSACTION_PROPERTY") {
      return <TransactionPropertySelect defaultValue={myDefaultValue} />;
    }
  }
  return <>{row?.PROPERTY_TYPE}</>;
};

export default TextFields;
