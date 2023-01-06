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

import {
  MyTextField,
  MyNumberTextField,
  MyCheckBox,
  ColorTextfield,
} from "../..";
import { changeValeus } from "../../../services/actions/overview/overviewDialog";

import TagService from "../../../services/api/tags";
const MinMaxSelection = (props) => {
  const { highchartProps, name } = props;

  const dispatch = useDispatch();
  const minimum = useSelector(
    (state) => state.overviewDialog.highchartProps[`${name} Y-Axis Minimum`]
  );
  const maximum = useSelector(
    (state) => state.overviewDialog.highchartProps[`${name} Y-Axis Maximum`]
  );
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid itme xs={12} sm={6} md={3}>
          <Grid container>
            <Grid item xs={12}>
              Y-Axis Minimum
            </Grid>
            <Grid item xs={12}>
              <MyNumberTextField
                defaultValue={minimum}
                handleChangeFunc={(value) => {
                  handleChangeFunc(`${name} Y-Axis Minimum`, value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid itme xs={12} sm={6} md={3}>
          <Grid container>
            <Grid item xs={12}>
              Y-Axis Maximum
            </Grid>
            <Grid item xs={12}>
              <MyNumberTextField
                defaultValue={maximum}
                handleChangeFunc={(value) => {
                  handleChangeFunc(`${name} Y-Axis Maximum`, value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const YAxis = (props) => {
  const Inputs = useSelector(
    (state) => state.overviewDialog.highchartProps.Inputs
  );
  return Inputs.map((e, i) => {
    return (
      <React.Fragment key={i}>
        <Grid item xs={12}>
          {e.FROM_ITEM_ID}
        </Grid>
        <MinMaxSelection
          highchartProps={props.highchartProps}
          name={e.FROM_ITEM_ID}
        />
      </React.Fragment>
    );
  });
};

const ColorPicker = () => {
  const dispatch = useDispatch();
  const Inputs = useSelector(
    (state) => state.overviewDialog.highchartProps.Inputs
  );
  const highchartProps = useSelector(
    (state) => state.overviewDialog.highchartProps
  );
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return Inputs.map((e, i) => (
    <Grid container key={i}>
      <Grid item xs={12}>
        Input,{e.FROM_ITEM_ID}
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item>
            <Grid container>
              <Grid item xs={12}>
                Color
              </Grid>
              <Grid item xs={12}>
                <ColorTextfield
                  defaultValue={highchartProps[`[${e.FROM_ITEM_ID}] Color`]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc(`[${e.FROM_ITEM_ID}] Color`, value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item xs={12}>
                Disable Data Grouping
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={
                    highchartProps[`[${e.FROM_ITEM_ID}] Disable Data Grouping`]
                  }
                  handleChangeFunc={(value) => {
                    handleChangeFunc(
                      `[${e.FROM_ITEM_ID}] Disable Data Grouping`,
                      value
                    );
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ));
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
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(
    tags.filter(
      (e) => !props.defaultValue.some((a) => a.FROM_ITEM_ID === e.FROM_ITEM_ID)
    )
  );
  const [right, setRight] = React.useState(
    tags.filter((e) =>
      props.defaultValue.some((a) => a.FROM_ITEM_ID === e.FROM_ITEM_ID)
    )
  );
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

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
    left.map(async (e) => {
      try {
        console.log(e);
        const body = JSON.stringify({ TAG_ID: e.FROM_ITEM_ID });
        let res = await TagService.getTagItemS(body);
        console.log(res);
        dispatch(
          changeValeus(
            `${e.FROM_ITEM_ID} Y-Axis Minimum`,
            res.data[0].NORMAL_MINIMUM
          )
        );
        dispatch(
          changeValeus(
            `${e.FROM_ITEM_ID} Y-Axis Maximum`,
            res.data[0].NORMAL_MAXIMUM
          )
        );
      } catch {}
    });
    setRight(right.concat(left));
    setLeft([]);
    handleChangeFunc(right.concat(left));
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
          sm: 200,
          md: 500,
        },
        height: 230,
        overflow: "auto",
      }}
    >
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
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
              <ListItemText id={labelId} primary={`${value.FROM_ITEM_ID}`} />
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

const Linechart = (props) => {
  const dispatch = useDispatch();
  const { highchartProps, handleClose } = props;
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <Grid container rowGap={2}>
      <Grid item xs={12}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Name
              </Grid>
              <Grid item xs={12}>
                <MyTextField
                  defaultValue={highchartProps.Name}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Name", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Name Font Size(em)
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["Name Font Size(em)"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Name Font Size(em)", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Refresh (Seconds)
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["Refresh (Seconds)"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Refresh (Seconds)", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                X-Axis Duration (minutes)
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["X-Axis Duration (minutes)"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("X-Axis Duration (minutes)", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Enable X-Axis Reset
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable X-Axis Reset"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable X-Axis Reset", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Enable Header Buttons
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable Header Buttons"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable Header Buttons", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Enable Title
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable Title"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable Title", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Enable Navbar
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable Navbar"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable Navbar", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Enable Export
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable Export"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable Export", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Enable Range Selector
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable Range Selector"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable Range Selector", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Enable Graph Legend
              </Grid>
              <Grid item xs={12}>
                <MyCheckBox
                  defaultValue={highchartProps["Enable Graph Legend"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Enable Graph Legend", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Graph Axis Value Font Size (em)
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={
                    highchartProps["Graph Axis Value Font Size (em)"]
                  }
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Graph Axis Value Font Size (em)", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Graph Axis Title Font Size (em)
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={
                    highchartProps["Graph Axis Title Font Size (em)"]
                  }
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Graph Axis Title Font Size (em)", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Graph Legend Font Size (em)
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["Graph Legend Font Size (em)"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Graph Legend Font Size (em)", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Grid container>
              <Grid item xs={12}>
                Graph Title Font Size (em)
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["Graph Title Font Size (em)"]}
                  handleChangeFunc={(value) => {
                    handleChangeFunc("Graph Title Font Size (em)", value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            Inputs
          </Grid>
          <Grid item xs={12}>
            <Inputs
              highchartProps={highchartProps}
              defaultValue={highchartProps["Inputs"]}
              handleChangeFunc={(value) => {
                handleChangeFunc("Inputs", value);
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            Enable Custom Colors
          </Grid>
          <Grid item xs={12}>
            <MyCheckBox
              defaultValue={highchartProps["Enable Custom Colors"]}
              handleChangeFunc={(value) => {
                handleChangeFunc("Enable Custom Colors", value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <ColorPicker />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12}>
              Enable Manuel Y-Axis Min/Max
            </Grid>
            <Grid item xs={12}>
              <MyCheckBox
                defaultValue={highchartProps["Enable Manuel Y-Axis Min/Max"]}
                handleChangeFunc={(value) => {
                  handleChangeFunc("Enable Manuel Y-Axis Min/Max", value);
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12}>
              Enable Y-Axis Align Ticks
            </Grid>
            <Grid item xs={12}>
              <MyCheckBox
                defaultValue={highchartProps["Enable Y-Axis Align Ticks"]}
                handleChangeFunc={(value) => {
                  handleChangeFunc("Enable Y-Axis Align Ticks", value);
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12}>
              Enable Y-Axis Start On Ticks
            </Grid>
            <Grid item xs={12}>
              <MyCheckBox
                defaultValue={highchartProps["Enable Y-Axis Start On Ticks"]}
                handleChangeFunc={(value) => {
                  handleChangeFunc("Enable Y-Axis Start On Ticks", value);
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12}>
              Enable Y-Axis End On Ticks
            </Grid>
            <Grid item xs={12}>
              <MyCheckBox
                defaultValue={highchartProps["Enable Y-Axis End On Ticks"]}
                handleChangeFunc={(value) => {
                  handleChangeFunc("Enable Y-Axis End On Ticks", value);
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <YAxis highchartProps={highchartProps} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Linechart;
