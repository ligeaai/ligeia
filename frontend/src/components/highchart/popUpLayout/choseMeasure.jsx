import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { changeValeus } from "../../../services/actions/overview/overviewDialog";
import { Select } from "../..";
import { instance, config } from "../../../services/baseApi";
import ItemLinkService from "../../../services/api/itemLink";
const ChoseMeasure = () => {
  const dispatch = useDispatch();
  const ItemData = useSelector((state) => state.overviewDialog.itemData);
  const measure = useSelector(
    (state) => state.overviewDialog.highchartProps.Measurement
  );

  const defProp = useSelector(
    (state) => state.overviewDialog.highchartProps["Transaction Property"]
  );
  const UOM = useSelector(
    (state) => state.overviewDialog.highchartProps["UOM"]
  );

  const [tags, setTags] = React.useState([]);

  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };

  React.useEffect(() => {
    const myFunc = async () => {
      if (ItemData.length === 0 || tags.length === 0) {
        let response = await ItemLinkService.getTags({ ID: defProp });
        setTags(response.data);
      }
    };
    myFunc();
  }, [defProp]);
  return (
    <Grid
      container
      columnSpacing={2}
      rowGap={2}
      sx={{ div: { fontSize: "14px" } }}
    >
      <Grid item xs={12} md={6}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12}>
            Transaction Property
          </Grid>
          <Grid item xs={12}>
            <Select
              disabled={ItemData.length === 0 ? true : false}
              values={ItemData}
              valuesPath="0"
              dataTextPath="1"
              defaultValue={defProp}
              handleChangeFunc={async (value) => {
                handleChangeFunc("Transaction Property", value);
                let res = await ItemLinkService.getTags({ ID: value });
                console.log(res);
                setTags(res.data);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12}>
            Measurement
          </Grid>
          <Grid item xs={12}>
            <Select
              disabled={tags.length === 0 ? true : false}
              values={tags}
              valuesPath="TAG_ID"
              dataTextPath="NAME"
              defaultValue={measure}
              handleChangeFunc={async (value) => {
                handleChangeFunc("Measurement", value);
                console.log(tags);
                handleChangeFunc(
                  "Minimum",
                  tags.filter((e) => e.TAG_ID === value)[0].NORMAL_MINIMUM
                );
                handleChangeFunc(
                  "Maximum",
                  tags.filter((e) => e.TAG_ID === value)[0].NORMAL_MAXIMUM
                );
                handleChangeFunc(
                  "UOM",
                  tags.filter((e) => e.TAG_ID === value)[0].UOM
                );
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container rowGap={0.5}>
          <Grid item xs={12}>
            Unit of Measurement
          </Grid>
          <Grid item xs={12}>
            <Select values={[UOM]} defaultValue={UOM} disabled={true} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChoseMeasure;
