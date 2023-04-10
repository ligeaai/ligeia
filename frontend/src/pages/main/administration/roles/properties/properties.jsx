import React from "react";

import { useDispatch, useSelector } from "react-redux";

import DataGrid from "./dataGrid";
import { MyBox } from "../../../../../components";

import {
  setBodyConfirmation,
  setSaveFunctonConfirmation,
  setTitleConfirmation,
} from "../../../../../services/actions/confirmation/historyConfirmation";

import { cleanRoles } from "../../../../../services/actions/roles/roles";
import {
  updateRole,
  loadRolesProps,
} from "../../../../../services/actions/roles/properties";
import NewRoleSavePopUp from "./newRoleSavePopUp";

const Properties = ({ isHome }) => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const name = useSelector((state) => state.treeview.selectedItem.ROLES_NAME);
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  React.useEffect(() => {
    dispatch(setSaveFunctonConfirmation(updateRole));
    dispatch(setTitleConfirmation("Are you sure you want to save this ? "));
    dispatch(setBodyConfirmation(name ? name : <NewRoleSavePopUp />));
    if (selectedIndex !== -3) dispatch(cleanRoles());
    if (selectedIndex !== -2 && selectedIndex !== -3) {
      dispatch(loadRolesProps());
    }
  }, [name, selectedIndex]);
  return (
    <MyBox
      sx={{
        maxWidth: `calc(100% - 21px)`,
        minHeight: isFullScreen
          ? "calc(500px - 60px - 40px )"
          : "calc(500px - 50px - 36px - 26px )",
        height: isFullScreen
          ? "calc(100vh - 60px - 40px )"
          : "calc(100vh - 60px - 50px - 36px - 26px )",
        "& .super-app-theme--cell": {
          backgroundColor: "background.info",
        },
        m: 0.5,
        button: { color: "status.secondary" },
      }}
      Element={isHome ? <DataGrid /> : <></>}
    ></MyBox>
  );
};

export default Properties;
