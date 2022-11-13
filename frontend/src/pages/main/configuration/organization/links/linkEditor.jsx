import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid, Typography, Divider, Button } from "@mui/material";

import { addItemType } from "../../../../../services/actions/company/datagrid";
import { TimeRangePicker } from "../../../../../components";
import { selectItem } from "../../../../../services/actions/company/item";
import Dialog from "./dialog";

import { loadLinkEditor } from "../../../../../services/actions/company/linkEditor";
import { instance, config } from "../../../../../services/baseApi";
const LinkEditor = ({ type }) => {
  console.log(type);
  const dispatch = useDispatch();
  const res = useSelector((state) => state.linkEditor.data);
  const links = useSelector((state) => state.linkEditor.links);
  const selectedItem = useSelector((state) => state.item.selectedItem);

  React.useEffect(() => {
    if (type === selectedItem.ITEM_TYPE) {
      dispatch(selectItem(selectedItem.selectedIndex));
    } else {
      dispatch({
        type: "SET_SELECTED_ITEM",
        payload: -3,
      });
    }
    dispatch(addItemType(type));
    dispatch({
      type: "CLEAN_ROWS",
    });
    dispatch(loadLinkEditor());
  }, [window.location.pathname]);

  if (res && selectedItem.NAME && links) {
    return (
      <Grid container>
        <Grid item xs={12} sx={{ p: 1 }}>
          <Typography>{selectedItem.NAME}</Typography>
          <Typography>{type}</Typography>
          {/* <TimeRangePicker /> */}
        </Grid>
        <Grid item xs={12}>
          {res.map((e, i) => (
            <Box key={i}>
              <Divider />
              <Box sx={{ p: 1 }}>
                <Box sx={{ mb: 1 }}>
                  <Dialog props={e} />
                </Box>
                <Box sx={{ mb: 3, fontSize: "14px" }}>{e.SHORT_LABEL}</Box>
              </Box>
              <Box>
                {links.map((a, key) => {
                  if (e.FROM_TYPE === a.FROM_ITEM_TYPE) {
                    if (selectedItem.ITEM_ID === a.TO_ITEM_ID) {
                      return (
                        <Box
                          key={key}
                          sx={{
                            boxShadow: 2,
                            mx: 1,
                            width: "min-content",
                            borderRadius: "5px",
                          }}
                        >
                          <Grid container sx={{ maxWidth: "250px" }}>
                            <Grid
                              item
                              xs={12}
                              sx={{
                                width: "250px",
                                borderBottom: "1px solid black",
                              }}
                            >
                              <Button
                                onClick={async () => {
                                  await instance.post(
                                    `/item-link/delete/`,
                                    {
                                      LINK_ID: a.LINK_ID,
                                    },
                                    config
                                  );
                                  dispatch(loadLinkEditor());
                                  console.log("delete");
                                }}
                              >
                                X
                              </Button>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{ borderRight: "1px solid black", p: 1 }}
                            >
                              {a.FROM_ITEM_TYPE}
                            </Grid>
                            <Grid item xs={6} sx={{ p: 1 }}>
                              <Grid container sx={{ fontSize: "12px" }}>
                                <Grid item xs={12}>
                                  Start:
                                  {a.START_DATETIME}
                                </Grid>
                                <Grid item xs={12}>
                                  End:{a.END_DATETIME}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      );
                    }
                  }
                })}
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
    );
  }
};

export default LinkEditor;
