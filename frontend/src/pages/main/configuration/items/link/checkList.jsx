import React from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { Box, Grid, Button, Divider } from "@mui/material/";

import { CheckboxList, DatePicker, Select } from "../../../../../components";
import {
  loadCheckedList,
  saveLinks,
  toggleChecked,
} from "../../../../../services/actions/item/checkedList";
import ItemLinkService from "../../../../../services/api/itemLink";
import { cardinalityCheck } from "../../../../../services/actions/item/cardinality";

let cancelToken;
const MyCheckList = (props) => {
  const dispatch = useDispatch();
  const CULTURE = useSelector((state) => state.lang.cultur);
  const instanttime = new Date();
  const [date, setDate] = React.useState(instanttime);
  const [values, setValues] = React.useState([""]);
  const [selectedValue, setSelectedValue] = React.useState(false);
  const data = useSelector((state) => state.checkedList.listItem);
  const checkedItemsLen = useSelector(
    (state) => state.checkedList.checkedItems.length
  );
  const handleToggleFunc = (data) => {
    dispatch(toggleChecked(data));
  };
  const onChange = (newValue) => {
    setDate(newValue);
  };
  React.useEffect(() => {
    async function myFunc() {
      try {
        const body = JSON.stringify({
          TYPE: props.data.TYPE,
          [props.type]: props.data[props.type],
          CULTURE: CULTURE,
        });
        if (cancelToken) {
          cancelToken.cancel();
        }
        cancelToken = axios.CancelToken.source();
        let res = await ItemLinkService.getRelated(body, cancelToken);
        setValues(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    myFunc();
    return () => {
      setValues([""]);
    };
  }, []);
  return (
    <React.Fragment>
      <Box sx={{ m: 1 }}>
        <Grid
          container
          style={{ cursor: "move", justifyContent: "space-between" }}
          id="draggable-dialog-title"
        >
          <Grid item sx={{ width: "125px" }}>
            <DatePicker time={instanttime} onChangeFunc={onChange} />
          </Grid>
          <Grid item>
            <Select
              values={values}
              dataTextPath={"SHORT_LABEL"}
              handleChangeFunc={(value) => {
                setSelectedValue(value);
                dispatch(
                  loadCheckedList(
                    value[props.type === "FROM_TYPE" ? "TO_TYPE" : "FROM_TYPE"],
                    props.type === "FROM_TYPE" ? "TO_TYPE" : "FROM_TYPE"
                  )
                );
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box sx={{ overflowY: "auto" }}>
        <CheckboxList
          data={data}
          dataTextPath="PROPERTY_STRING"
          handleToggleFunc={handleToggleFunc}
        />
      </Box>
      <Divider />
      <Grid
        container
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Grid item sx={{ pl: 1, fontSize: "14px" }}>
          Selected Items:{checkedItemsLen}
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <Button
                onClick={() => {
                  props.onClose();
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={async () => {
                  if (
                    await dispatch(
                      cardinalityCheck(
                        props.data.TYPE,
                        props.type === "TO_TYPE"
                          ? "TO_ITEM_ID"
                          : "FROM_ITEM_ID",
                        selectedValue
                      )
                    )
                  ) {
                    dispatch(
                      await saveLinks(
                        date,
                        props.data.TYPE,
                        props.data.TO_TYPE,
                        props.data.FROM_TYPE,
                        props.refreshHandle
                      )
                    );
                    props.onClose();
                  } else {
                    dispatch({
                      type: "ADD_ERROR_SUCCESS",
                      payload: "Cardinality error",
                    });
                  }
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default MyCheckList;
