import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid } from "@mui/material";

import { Select, InputGenerator } from "../../../components";
import {
  changeSelectValue,
  changeValeus,
} from "../../../services/actions/overview/overviewDialog";
import {
  loadSelectItems,
  fillProperties,
} from "../../../services/actions/overview/overviewDialog";
import { saveChart } from "../../../services/actions/overview/overviewDialog";
import TagService from "../../../services/api/tags";
const MesurementInputGenerator = (props) => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.overviewDialog.measuremenetData);
  console.log(values);
  const handleChangeFunc = async (value) => {
    console.log(value);
    dispatch(changeValeus("Mesurement", value));
    try {
      const body = JSON.stringify({ TAG_ID: value });
      let res = await TagService.getTagItem(body);
      console.log(res);
      dispatch(changeValeus("Minimum", res.data[0].NORMAL_MINIMUM));
      dispatch(changeValeus("Maximum", res.data[0].NORMAL_MAXIMUM));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Select
      {...props}
      values={values}
      valuesPath="FROM_ITEM_ID"
      dataTextPath="FROM_ITEM_ID"
      handleChangeFunc={handleChangeFunc}
    />
  );
};

const DialogContent = ({ handleClose }) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector(
    (state) => state.overviewDialog.selectedItem
  );
  const properties = useSelector((state) => state.overviewDialog.values);
  const values = useSelector((state) => state.overviewDialog.selectItems);
  const handleChangeFunc = async (props) => {
    dispatch(await changeSelectValue(props));
  };
  React.useEffect(() => {
    async function myFunc() {
      dispatch(await loadSelectItems());
      dispatch(await fillProperties());
    }
    myFunc();
  }, []);
  return (
    <Grid container sx={{ p: 1, width: "100%" }}>
      <Grid item sx={{ pb: 2 }}>
        <Select
          values={values}
          handleChangeFunc={handleChangeFunc}
          defaultValue={selectedItem}
        />
      </Grid>
      {properties.map((e, i) => {
        return (
          <Grid container key={i}>
            {e.map((a, key) => {
              return (
                <Grid item xs={6} sm={4} md={3} sx={{ pr: 1, pb: 1 }}>
                  <Grid container>
                    <Grid item xs={12}>
                      {a.title}
                    </Grid>
                    <Grid item sx={{ width: "100%" }}>
                      {a.title === "Mesurement" ? (
                        <MesurementInputGenerator
                          {...a}
                          changeFunction={changeValeus}
                        />
                      ) : (
                        <InputGenerator {...a} changeFunction={changeValeus} />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Grid container sx={{ flexDirection: "row-reverse" }}>
          <Grid item>
            <Button onClick={handleClose} color="error">
              Cancel
            </Button>
            <Button
              onClick={() => {
                dispatch(saveChart());
                handleClose();
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DialogContent;
