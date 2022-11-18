import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid, Typography, Divider, IconButton } from "@mui/material";

import { addItemType } from "../../../../../services/actions/company/datagrid";
import { TimeRangePicker } from "../../../../../components";
import { selectItem } from "../../../../../services/actions/company/item";
import Dialog from "./dialog";

import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

import { loadLinkEditor } from "../../../../../services/actions/company/linkEditor";
import { instance, config } from "../../../../../services/baseApi";
import {
  deleteLinkItem,
  updateItemLink,
  saveLinkItem,
} from "../../../../../services/actions/company/linkEditor";
import DatePicker from "../../../../../components/datePicker/datePicker";

const LinkEditor = ({ type }) => {
  const dispatch = useDispatch();
  const res = useSelector((state) => state.linkEditor.linkEditorSchema);
  const resFromType = useSelector(
    (state) => state.linkEditor.linkEditorSchemaFromType
  );
  const links = useSelector((state) => state.linkEditor.links);
  const changedLinks = useSelector((state) => state.linkEditor.changedLinks);
  const selectedItem = useSelector((state) => state.item.selectedItem);
  console.log(res);
  console.log(links);
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
    dispatch(loadLinkEditor());
  }, [window.location.pathname]);

  if (res && selectedItem.NAME && links) {
    return (
      <Grid container>
        {/* <Grid item xs={12} sx={{ p: 1 }}>
          <Typography>{selectedItem.NAME}</Typography>
          <Typography>{type}</Typography>
          <TimeRangePicker /> 
        </Grid> */}
        <Grid item xs={6}>
          <Box sx={{ width: "100%", textAlign: "center" }}>In</Box>
          {Object.keys(res).map((e, i) => (
            <Box key={i}>
              <Divider />
              <Box sx={{ p: 1 }}>
                <Box sx={{ mb: 3, fontSize: "14px" }}>{res[e].TYPE}</Box>
                <Box sx={{ mb: 1 }}>
                  <Dialog data={res[e]} dataSelectItemPath="data" />
                </Box>
              </Box>
              <Grid container spacing={1} sx={{ p: 1 }}>
                {Object.keys(links).map((a, key) => {
                  if (links[a].TO_ITEM_TYPE === selectedItem.ITEM_TYPE) {
                    if (res[e].TYPE === links[a].LINK_TYPE) {
                      const onChangeStartDateTime = (newDate) => {
                        dispatch(
                          updateItemLink(
                            links[a].LINK_ID,
                            "START_DATETIME",
                            newDate
                          )
                        );
                      };
                      const onChangeEndDateTime = (newDate) => {
                        dispatch(
                          updateItemLink(
                            links[a].LINK_ID,
                            "END_DATETIME",
                            newDate
                          )
                        );
                      };
                      return (
                        <Grid item key={key}>
                          <Grid
                            container
                            sx={{
                              maxWidth: "278px",
                              borderRadius: "5px",
                              boxShadow: 2,
                            }}
                          >
                            <Grid
                              item
                              xs={12}
                              sx={{
                                width: "278px",
                                borderBottom: "1px solid black",
                              }}
                            >
                              <IconButton
                                onClick={async () => {
                                  const deleteFunc = async () => {
                                    dispatch(deleteLinkItem(links[a].LINK_ID));
                                  };
                                  dispatch({
                                    type: "confirmation/setConfirmation",
                                    payload: {
                                      title: "Are you sure you want to delete?",
                                      body: `${links[a].FROM_ITEM_NAME} it will be deleted`,
                                      agreefunction: deleteFunc,
                                    },
                                  });
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{ borderRight: "1px solid black", p: 1 }}
                            >
                              <Grid container sx={{ fontSize: "14px" }}>
                                <Grid item xs={12}>
                                  {links[a].FROM_ITEM_TYPE}
                                </Grid>
                                <Grid item xs={12} sx={{ fontSize: "12px" }}>
                                  {links[a].FROM_ITEM_NAME}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6} sx={{ p: 1 }}>
                              <Grid container sx={{ fontSize: "12px" }}>
                                <Grid item xs={12}>
                                  Start:
                                  <DatePicker
                                    time={new Date(links[a].START_DATETIME)}
                                    onChangeFunc={onChangeStartDateTime}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  End:
                                  <DatePicker
                                    time={new Date(links[a].END_DATETIME)}
                                    onChangeFunc={onChangeEndDateTime}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    }
                  }
                })}
              </Grid>
            </Box>
          ))}
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ width: "100%", textAlign: "center" }}>Out</Box>
          {Object.keys(resFromType).map((e, i) => (
            <Box key={i}>
              <Divider />
              <Box sx={{ p: 1 }}>
                <Box sx={{ mb: 3, fontSize: "14px" }}>
                  {resFromType[e].TYPE}
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Dialog
                    data={resFromType[e]}
                    dataSelectItemPath="dataFromType"
                  />
                </Box>
              </Box>
              <Grid container spacing={1} sx={{ p: 1 }}>
                {Object.keys(links).map((a, key) => {
                  if (links[a].FROM_ITEM_TYPE === selectedItem.ITEM_TYPE) {
                    if (resFromType[e].TYPE === links[a].LINK_TYPE) {
                      const onChangeStartDateTime = (newDate) => {
                        dispatch(
                          updateItemLink(
                            links[a].LINK_ID,
                            "START_DATETIME",
                            newDate
                          )
                        );
                      };
                      const onChangeEndDateTime = (newDate) => {
                        dispatch(
                          updateItemLink(
                            links[a].LINK_ID,
                            "END_DATETIME",
                            newDate
                          )
                        );
                      };
                      return (
                        <Grid item key={key}>
                          <Grid
                            container
                            sx={{
                              maxWidth: "278px",
                              borderRadius: "5px",
                              boxShadow: 2,
                            }}
                          >
                            <Grid
                              item
                              xs={12}
                              sx={{
                                width: "278px",
                                borderBottom: "1px solid black",
                              }}
                            >
                              <IconButton
                                onClick={async () => {
                                  const deleteFunc = async () => {
                                    dispatch(deleteLinkItem(links[a].LINK_ID));
                                  };
                                  dispatch({
                                    type: "confirmation/setConfirmation",
                                    payload: {
                                      title: "Are you sure you want to delete?",
                                      body: `${links[a].FROM_ITEM_NAME} it will be deleted`,
                                      agreefunction: deleteFunc,
                                    },
                                  });
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              sx={{ borderRight: "1px solid black", p: 1 }}
                            >
                              <Grid container sx={{ fontSize: "14px" }}>
                                <Grid item xs={12}>
                                  {links[a].FROM_ITEM_TYPE}
                                </Grid>
                                <Grid item xs={12} sx={{ fontSize: "12px" }}>
                                  {links[a].FROM_ITEM_NAME}
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6} sx={{ p: 1 }}>
                              <Grid container sx={{ fontSize: "12px" }}>
                                <Grid item xs={12}>
                                  Start:
                                  <DatePicker
                                    time={new Date(links[a].START_DATETIME)}
                                    onChangeFunc={onChangeStartDateTime}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  End:
                                  <DatePicker
                                    time={new Date(links[a].END_DATETIME)}
                                    onChangeFunc={onChangeEndDateTime}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    }
                  }
                })}
              </Grid>
            </Box>
          ))}
        </Grid>
      </Grid>
    );
  }
};

export default LinkEditor;
