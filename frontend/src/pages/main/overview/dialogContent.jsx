import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Grid from "@mui/material/grid";
import Button from "@mui/material/button";

import { Select, InputGenerator } from "../../../components";
import {
  changeSelectValue,
  changeValeus,
} from "../../../services/actions/overview/overviewDialog";
import { loadSelectItems } from "../../../services/actions/overview/overviewDialog";

const DialogContent = () => {
  const dispatch = useDispatch();
  const selectedItem = useSelector(
    (state) => state.overviewDialog.selectedItem
  );
  const properties = useSelector((state) => state.overviewDialog.values);
  const values = useSelector((state) => state.overviewDialog.selectItems);
  const handleChangeFunc = (props) => {
    dispatch(changeSelectValue(props));
  };
  React.useEffect(() => {
    dispatch(loadSelectItems());
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
                      <InputGenerator {...a} changeFunction={changeValeus} />
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        );
      })}
      <Grid>
        <Button>Save</Button>
      </Grid>
    </Grid>
  );
};

export default DialogContent;
