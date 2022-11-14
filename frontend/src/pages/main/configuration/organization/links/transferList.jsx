import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { instance, config } from "../../../../../services/baseApi";
import { useDispatch, useSelector } from "react-redux";
import { loadLinkEditor } from "../../../../../services/actions/company/linkEditor";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransferList({ props }) {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState([]);
  const selectedItemId = useSelector(
    (state) => state.item.selectedItem.ITEM_ID
  );
  React.useEffect(() => {
    console.log("asdasdasdasdasds");
    const myFunc = async () => {
      const type = props.FROM_TYPE;
      let res = await instance.get(`/item/details/${type}`, config);

      try {
        let itemLinkRes = await instance.post(
          `/item-link/details/`,
          {
            TO_ITEM_ID: selectedItemId,
          },
          config
        );
        var leftTemp = [];
        // var rightTemp = [];
        res.data.map((e) => {
          console.log(e);
          var temp = true;
          itemLinkRes.data.map((a) => {
            console.log(a);

            if (e.ITEM_ID === a.FROM_ITEM_ID) {
              temp = false;
              // rightTemp.push(e);
            }
          });
          if (temp) {
            leftTemp.push(e);
          }
        });
        setLeft(leftTemp);
        setRight([]);
        // setRight(rightTemp);
      } catch (err) {
        var temp = [];
        res.data.map((e) => {
          temp.push(e);
        });
        setLeft(temp);
        setRight([]);
      }
    };

    myFunc();
  }, []);
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
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value.NAME}-label`;

          return (
            <ListItem
              key={value.NAME}
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
        <ListItem />
      </List>
    </Paper>
  );
  const instanttime = new Date();
  const [date, setDate] = React.useState(instanttime);
  const dispatch = useDispatch();
  return (
    <Grid container spacing={1} justifyContent="center" alignItems="center">
      <Grid item xs={12} sx={{ m: 1 }}>
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item sx={{}}>
            Start Date Time :{" "}
          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={date}
                onChange={(newValue) => {
                  setDate(newValue.$d);
                }}
                components={{
                  OpenPickerIcon: CalendarTodayIcon,
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    sx={{
                      width: "125px",
                      border: "none",
                      ".MuiInputAdornment-root": {
                        pl: 0,
                        ml: 0,
                        button: {
                          svg: {
                            fontSize: "medium",
                          },
                          color: "#4B4B4B",
                        },
                      },
                      Input: {
                        color: "#4B4B4B",
                        fontSize: "12px",
                        paddingY: "6px",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Grid>
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
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}
      >
        <Button
          onClick={async () => {
            function _uuidv4() {
              return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
                /[018]/g,
                (c) =>
                  (
                    c ^
                    (crypto.getRandomValues(new Uint8Array(1))[0] &
                      (15 >> (c / 4)))
                  ).toString(16)
              );
            }
            const saveFunc = async () => {
              right.map(async (e) => {
                var d = date.getDate();
                var m = date.getMonth();
                m += 1;
                var y = date.getFullYear();
                var newdate = y + "-" + m + "-" + d;
                const linkUuid = _uuidv4();
                const rowUuid = _uuidv4();
                const body = JSON.stringify({
                  LINK_ID: linkUuid.replace(/-/g, ""),
                  LINK_TYPE: props.TYPE,
                  START_DATETIME: newdate,
                  END_DATETIME: "9000-1-1",
                  FROM_ITEM_ID: e.ITEM_ID,
                  FROM_ITEM_TYPE: props.FROM_TYPE,
                  TO_ITEM_ID: selectedItemId,
                  TO_ITEM_TYPE: props.TO_TYPE,
                  ROW_ID: rowUuid.replace(/-/g, ""),
                });
                try {
                  let res = await instance.post(
                    `/item-link/save/`,
                    body,
                    config
                  );
                  dispatch(loadLinkEditor());
                } catch (err) {}
              });
            };
            dispatch({
              type: "confirmation/setConfirmation",
              payload: {
                title: "Are you sure you want to save?",
                body: <>{right.map((e) => e.NAME)}</>,
                agreefunction: saveFunc,
              },
            });
          }}
        >
          Save
        </Button>
      </Grid>
    </Grid>
  );
}
