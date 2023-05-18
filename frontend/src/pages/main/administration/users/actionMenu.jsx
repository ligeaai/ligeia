import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Tooltip, IconButton } from "@mui/material";

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { MyDialog } from "../../../../components";

import AddNewUser from "./addNewUser";
import { saveUsers } from "../../../../services/actions/users/users";
import { setIsActiveConfirmation } from "../../../../services/actions/confirmation/historyConfirmation";
import { setConfirmation } from "../../../../services/reducers/confirmation";
const UsersActionMenu = () => {
  const dispatch = useDispatch();
  const isChanged = useSelector((state) => state.historyConfirmation.isActive);
  const save = () => {
    if (isChanged) {
      dispatch(
        setConfirmation({
          title: "Are you sure you want to save this ?",
          body: ``,
          agreefunction: async () => {
            dispatch(saveUsers());
            dispatch(setIsActiveConfirmation(false));
          },
        })
      );
    }
  };

  return (
    <Box className="action-menu-container">
      <Tooltip
        title={"New"}
        componentsProps={{
          tooltip: {
            id: "action-menu-container__tooltip",
          },
        }}
      >
        <MyDialog
          Button={
            <IconButton>
              <AddBoxOutlinedIcon />
            </IconButton>
          }
          DialogBody={AddNewUser}
          defaultWH={[400, 400]}
        />
      </Tooltip>
      <Tooltip
        title={"Save"}
        componentsProps={{
          tooltip: {
            id: "action-menu-container__tooltip",
          },
        }}
      >
        <IconButton
          onClick={() => {
            save();
          }}
        >
          <SaveOutlinedIcon
            fontSize="small"
            className="action-menu-container__icon"
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default UsersActionMenu;
