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
import "../../assets/styles/page/overview/inputs.scss";
import {
  setItems,
  setCheckedItems,
  updateCheckedItems,
} from "../../services/actions/workflow/workflow";
const RenderRow = (props) => {
  const {
    data,
    index,
    style,
    selectFunc = () => {},
    primaryText = "", //Specifies the path to reach the text in data
  } = props;
  const selected = useSelector(
    (state) => state.workflow.checkedItems[data[index].ITEM_ID]
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
  const items = useSelector((state) => state.workflow?.items);
  const selectedItem = useSelector((state) => state.workflow?.data?.ITEM_ID);
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  React.useEffect(() => {
    dispatch(setItems());
  }, []);
  React.useEffect(() => {
    setLeft(
      items.filter((e) => !selectedItem.some((a) => a.ITEM_ID === e.ITEM_ID))
    );
    setRight(
      items.filter((e) => selectedItem.some((a) => a.ITEM_ID === e.ITEM_ID))
    );
    dispatch(setCheckedItems());
  }, [items, selectedItem]);

  const handleToggle = (value, val) => {
    dispatch(updateCheckedItems(value.ITEM_ID, val));
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
    setLeft([]);
    handleChangeFunc(right.concat(left));
  };
  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    handleChangeFunc([]);
  };
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    handleChangeFunc(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
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
                primaryText: "PROPERTY_STRING",
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
