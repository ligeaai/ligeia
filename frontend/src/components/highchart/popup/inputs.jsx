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

import { changeValeus } from "../../../services/actions/overview/overviewDialog";

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
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(
    tags.filter((e) => !props.defaultValue.some((a) => a.TAG_ID === e.TAG_ID))
  );
  const [right, setRight] = React.useState(
    tags.filter((e) => props.defaultValue.some((a) => a.TAG_ID === e.TAG_ID))
  );
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  console.log("dsalşdkş");
  const handleToggle = (value) => () => {
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
    setRight(right.concat(left));
    left.map(async (e) => {
      dispatch(changeValeus(`${e.NAME} Y-Axis Minimum`, e.NORMAL_MINIMUM));
      dispatch(changeValeus(`${e.NAME} Y-Axis Maximum`, e.NORMAL_MAXIMUM));
    });
    setLeft([]);
    handleChangeFunc(right.concat(left));
  };

  const handleCheckedRight = () => {
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
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    handleChangeFunc(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    handleChangeFunc([]);
  };

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
      <List dense component="div" role="list">
        {items.map((value, index) => {
          const labelId = `transfer-list-item-${index}-label`;

          return (
            <ListItem
              key={index}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${value.NAME}`} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
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
          <Button
            sx={{ my: 0.5 }}
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
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
};

export default React.memo(Inputs);
