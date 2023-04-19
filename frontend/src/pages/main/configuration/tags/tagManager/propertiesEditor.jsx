import React from "react";
import Grid from "@mui/material/Grid";

import { useDispatch, useSelector } from "react-redux";
import TextFields from "./textfields";
import { fillTagData } from "../../../../../services/actions/tags/tags";
import {
  setBodyConfirmation,
  setSaveFunctonConfirmation,
  setTitleConfirmation,
} from "../../../../../services/actions/confirmation/historyConfirmation";
import { saveTag, addNewTag } from "../../../../../services/actions/tags/tags";

const PropertiesEditor = () => {
  const dispatch = useDispatch();
  const tagValues = useSelector((state) => state.tags.tagValues);
  const tagId = useSelector((state) => state.treeview.selectedItem.TAG_ID);
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const name = useSelector((state) => state.treeview.selectedItem.NAME);
  React.useEffect(() => {
    if (selectedIndex === -2) {
      dispatch(addNewTag());
    }
  }, [selectedIndex]);
  React.useEffect(() => {
    dispatch(setSaveFunctonConfirmation(saveTag));
    dispatch(setTitleConfirmation("You want to save this ?"));
    dispatch(setBodyConfirmation(`${name ? name : "new"}`));
    if (selectedIndex !== -2 && selectedIndex !== -3) {
      dispatch(fillTagData(tagId));
    }
  }, [tagId, name]);

  if (Object.keys(tagValues).length > 0 && (tagId || selectedIndex === -2)) {
    return (
      <Grid
        container
        className="tag-manager-container__body__property-box__prop-item"
      >
        <Grid
          item
          xs={12}
          className="tag-manager-container__body__property-box__prop-item__box"
        >
          <Grid container>
            <Grid
              item
              xs={12}
              className="tag-manager-container__body__property-box__prop-item__box__header"
            >
              Tag Link
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className="tag-manager-container__body__property-box__prop-item__box__body"
            >
              {Object.keys(tagValues.TAG_LINK).map((e, key) => {
                return (
                  <Grid
                    container
                    className="tag-manager-container__body__property-box__prop-item__box__select-box"
                    key={key}
                  >
                    <Grid
                      item
                      className="tag-manager-container__body__property-box__prop-item__box__label"
                    >
                      {tagValues.TAG_LINK[e].SHORT_LABEL}
                    </Grid>
                    <Grid
                      item
                      className={
                        "tag-manager-container__body__property-box__prop-item__box__label-field"
                      }
                    >
                      <TextFields row={tagValues.TAG_LINK[e]} />
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          className="tag-manager-container__body__property-box__prop-item__box"
        >
          <Grid container>
            <Grid
              item
              xs={12}
              className="tag-manager-container__body__property-box__prop-item__box__header"
            >
              Tag Information
            </Grid>
            <Grid
              item
              xs={12}
              key={"startdatetime"}
              className="tag-manager-container__body__property-box__prop-item__box__body"
            >
              <Grid container>
                <Grid item xs={6}>
                  <Grid
                    container
                    className="tag-manager-container__body__property-box__prop-item__box__select-box"
                  >
                    <Grid
                      item
                      className="tag-manager-container__body__property-box__prop-item__box__label"
                    >
                      {tagValues.TAG_INFORMATIONS[0].SHORT_LABEL}
                    </Grid>
                    <Grid
                      item
                      className="tag-manager-container__body__property-box__prop-item__box__field"
                    >
                      <TextFields row={tagValues.TAG_INFORMATIONS[0]} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* <Uom  /> */}
            {Object.keys(tagValues.TAG_INFORMATIONS).map((e, key) => {
              if (
                tagValues.TAG_INFORMATIONS[e].PROPERTY_TYPE !== "GUID" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !==
                  "END_DATETIME" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !==
                  "LAST_UPDT_USER" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !==
                  "LAST_UPDT_DATE" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !== "LOAD" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !== "ITEM_ID" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !== "TARGET_ID" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !==
                  "FULL_INTERVAL" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !== "ACCESS" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !== "DESCRIPTION" &&
                tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME !== "START_DATETIME"
              ) {
                return tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME === "UOM" ? (
                  <TextFields row={tagValues.TAG_INFORMATIONS[e]} />
                ) : tagValues.TAG_INFORMATIONS[e].PROPERTY_NAME === "NAME" ? (
                  <TextFields row={tagValues.TAG_INFORMATIONS[e]} />
                ) : (
                  <Grid item xs={12} md={6} key={key}>
                    <Grid
                      container
                      className="tag-manager-container__body__property-box__prop-item__box__select-box"
                    >
                      <Grid
                        item
                        className="tag-manager-container__body__property-box__prop-item__box__body tag-manager-container__body__property-box__prop-item__box__label"
                      >
                        {tagValues.TAG_INFORMATIONS[e].SHORT_LABEL}
                      </Grid>
                      <Grid
                        item
                        className={
                          "tag-manager-container__body__property-box__prop-item__box__label-field"
                        }
                      >
                        <TextFields row={tagValues.TAG_INFORMATIONS[e]} />
                      </Grid>
                    </Grid>
                  </Grid>
                );
              }
            })}
            <Grid
              item
              xs={12}
              key={"description"}
              className="tag-manager-container__body__property-box__prop-item__box__body"
            >
              <Grid
                container
                className="tag-manager-container__body__property-box__prop-item__box__select-box"
              >
                <Grid
                  item
                  className="tag-manager-container__body__property-box__prop-item__box__label"
                >
                  {tagValues.TAG_INFORMATIONS[6].SHORT_LABEL}
                </Grid>
                <Grid
                  item
                  className="tag-manager-container__body__property-box__prop-item__box__field"
                >
                  <TextFields row={tagValues.TAG_INFORMATIONS[6]} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  return <></>;
};

export default PropertiesEditor;
