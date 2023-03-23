import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { useIsMount } from "../../../../../hooks/useIsMount";
import { setIsActiveLink } from "../../../../../services/actions/item/itemLinkEditor";

import {
  setBodyConfirmation,
  setSaveFunctonConfirmation,
  setTitleConfirmation,
} from "../../../../../services/actions/confirmation/historyConfirmation";

import { saveItemLink } from "../../../../../services/actions/item/itemLinkEditor";

import ItemLinks from "./itemLinks";
const LinkEditor = () => {
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const name = useSelector(
    (state) => state.treeview.selectedItem.PROPERTY_STRING
  );
  React.useEffect(() => {
    dispatch(setIsActiveLink(true));
    return () => {
      dispatch(setIsActiveLink(false));
    };
  }, []);
  React.useEffect(() => {
    if (isMount) {
      dispatch(setSaveFunctonConfirmation(saveItemLink));
      dispatch(setTitleConfirmation("Are you sure you want to save this ? "));
      dispatch(setBodyConfirmation(`${name ? name : "new"}`));
    }
  }, [selectedIndex]);
  if (name) {
    return (
      <Grid container sx={{ minHeight: "100%", height: "min-content" }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ width: "100%", textAlign: "center", fontWeight: "bold" }}>
            In
          </Box>
          <ItemLinks
            itemType={"linkEditorSchema"}
            connection={"TO_ITEM_ID"}
            type={"TO_TYPE"}
          />
        </Grid>
        <Grid item sx={{ position: "relative" }}>
          <Divider
            sx={{
              position: "absolute",
              left: "50%",
              borderWidth: "0.1px",
              height: "100%",
              backgroundColor: "text.primary",
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ width: "100%", textAlign: "center", fontWeight: "bold" }}>
            Out
          </Box>
          <ItemLinks
            itemType={"linkEditorSchemaFromType"}
            connection={"FROM_ITEM_ID"}
            type={"FROM_TYPE"}
          />
        </Grid>
      </Grid>
    );
  }
  return <></>;
};

export default LinkEditor;
