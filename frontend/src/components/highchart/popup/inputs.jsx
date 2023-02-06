import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Box,
  Grid,
  List,
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
  console.log(data);
  return (
    <ListItem
      style={style}
      key={index}
      component="div"
      disablePadding
      sx={{
        ".MuiButtonBase-root": {
          py: 0.5,
        },
      }}
      onClick={(event) => {
        selectFunc(data[index], !selected);
      }}
    >
      <ListItemIcon>
        <Checkbox checked={selected} tabIndex={-1} disableRipple />
      </ListItemIcon>
      <ListItemText
        primary={`${data[index][primaryText]}`}
        sx={{
          span: {
            color: "primary.main",
            fontSize: "14px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          },
        }}
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
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  React.useEffect(() => {
    setLeft(tags.filter((e) => !Inputs.some((a) => a.TAG_ID === e.TAG_ID)));
    setRight(tags.filter((e) => Inputs.some((a) => a.TAG_ID === e.TAG_ID)));
    dispatch(setCheckeds(tags));
  }, [tags]);
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

  // const handleAllRight = () => {
  //   leftChecked.map((e) => {
  //     dispatch(updateChecked(e.TAG_ID, false));
  //   });
  //   setRight(right.concat(left));
  //   left.map(async (e) => {
  //     dispatch(changeValeus(`${e.NAME} Y-Axis Minimum`, e.NORMAL_MINIMUM));
  //     dispatch(changeValeus(`${e.NAME} Y-Axis Maximum`, e.NORMAL_MAXIMUM));
  //   });
  //   setLeft([]);
  //   handleChangeFunc(right.concat(left));
  // };

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

  // const handleAllLeft = () => {
  //   rightChecked.map((e) => {
  //     dispatch(updateChecked(e.TAG_ID, false));
  //   });
  //   setLeft(left.concat(right));
  //   setRight([]);
  //   handleChangeFunc([]);
  // };

  const customList = (items) => (
    <Paper
      sx={{
        width: {
          xs: 150,
          md: 375,
        },
        height: 230,
        overflow: "auto",
      }}
    >
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
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          {/* <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button> */}
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          {/* <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button> */}
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
};

export default React.memo(Inputs);
