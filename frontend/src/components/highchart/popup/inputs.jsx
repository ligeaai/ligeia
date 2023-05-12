import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Grid,
  Paper,
  ListItem,
  ListItemIcon,
  Checkbox,
  Button,
  ListItemText,
} from "@mui/material";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { changeValeus } from "../../../services/actions/overview/overviewDialog";
import {
  updateChecked,
  setCheckeds,
} from "../../../services/actions/overview/taps";
import ItemLinkService from "../../../services/api/itemLink";
import axios from "axios";
import "../../../assets/styles/page/overview/inputs.scss";
let cancelToken;
const RenderRow = (props) => {
  const {
    data,
    index,
    style,
    selectFunc = () => {},
    primaryText = "", //Specifies the path to reach the text in data
  } = props;
  const selected = useSelector(
    (state) => state.tapsOverview.isChecked[data[index].TAG_ID]
  );
  return (
    <ListItem
      style={style}
      key={index}
      component="div"
      disablePadding
      onClick={(event) => {
        selectFunc(data[index], !selected);
      }}
    >
      <ListItemIcon>
        <Checkbox checked={selected} tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText
        primary={`${data[index][primaryText]}`}
        className="overview-inputs-container__list-box__item__text"
      />
    </ListItem>
  );
};

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const Inputs = (props) => {
  const dispatch = useDispatch();
  const { handleChangeFunc } = props;
  const tags = useSelector((state) => state.overviewDialog.measuremenetData);
  const Inputs = useSelector(
    (state) => state.overviewDialog.highchartProps["Inputs"]
  );
  const transactionProps = useSelector(
    (state) => state.overviewDialog.highchartProps["Assets"]
  );
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  React.useEffect(() => {
    setLeft(tags.filter((e) => !Inputs?.some((a) => a.TAG_ID === e.TAG_ID)));
    setRight(tags.filter((e) => Inputs?.some((a) => a.TAG_ID === e.TAG_ID)));
    dispatch(setCheckeds(tags));
  }, [tags]);
  React.useEffect(() => {
    async function myFunc() {
      if (cancelToken) {
        cancelToken.cancel();
      }
      cancelToken = axios.CancelToken.source();
      let ids = [];
      transactionProps.map((e) => {
        ids.push(e[0]);
      });
      const body = JSON.stringify({ ID: ids });
      let res = await ItemLinkService.getItemTags(body, cancelToken);
      dispatch({
        type: "SET_MEASUREMENT_DATA",
        payload: res.data,
      });
    }
    myFunc();
  }, []);
  const handleToggle = (value, val) => {
    dispatch(updateChecked(value.TAG_ID, val));
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleAllRight = () => {
    leftChecked.map((e) => {
      dispatch(updateChecked(e.TAG_ID, false));
    });
    setRight(right.concat(left));
    left.map(async (e) => {
      dispatch(changeValeus(`${e.NAME} Y-Axis Minimum`, e.NORMAL_MINIMUM));
      dispatch(changeValeus(`${e.NAME} Y-Axis Maximum`, e.NORMAL_MAXIMUM));
    });
    setLeft([]);
    handleChangeFunc(right.concat(left));
  };
  const handleAllLeft = () => {
    rightChecked.map((e) => {
      dispatch(updateChecked(e.TAG_ID, false));
    });
    setLeft(left.concat(right));
    setRight([]);
    handleChangeFunc([]);
  };
  const handleCheckedRight = () => {
    leftChecked.map((e) => {
      dispatch(updateChecked(e.TAG_ID, false));
    });
    setRight(right.concat(leftChecked));
    handleChangeFunc(right.concat(leftChecked));
    leftChecked.map(async (e) => {
      dispatch(changeValeus(`${e.NAME} Y-Axis Minimum`, e.NORMAL_MINIMUM));
      dispatch(changeValeus(`${e.NAME} Y-Axis Maximum`, e.NORMAL_MAXIMUM));
    });
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    rightChecked.map((e) => {
      dispatch(updateChecked(e.TAG_ID, false));
    });
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    handleChangeFunc(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (items) => (
    <Paper className="overview-inputs-container__list-box__item">
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={35}
            itemCount={items.length}
            itemData={items}
            overscanCount={5}
          >
            {(props) =>
              RenderRow({
                ...props,
                selectFunc: handleToggle,
                primaryText: "NAME",
              })
            }
          </FixedSizeList>
        )}
      </AutoSizer>
    </Paper>
  );

  return (
    <Grid
      container
      justifyContent="center"
      columns={24}
      className="overview-inputs-container"
    >
      <Grid item xs={10.5} className="overview-inputs-container__list-box">
        {customList(left)}
      </Grid>
      <Grid item xs={3}>
        <Grid container direction="column" rowGap={1} alignItems="center">
          <Button
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={10.5} className="overview-inputs-container__list-box">
        {customList(right)}
      </Grid>
    </Grid>
  );
};

export default React.memo(Inputs);
