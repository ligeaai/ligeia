import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { ActionMenu } from "../../../../components";

import { selectTreeViewItem } from "../../../../services/actions/treeview/treeview";
import { setConfirmation } from "../../../../services/reducers/confirmation";
import { setIsActiveConfirmation } from "../../../../services/actions/confirmation/historyConfirmation";
import {
  deleteProject,
  saveProject,
  cleanProjectData,
} from "../../../../services/actions/project/project";

const ProjectActionMenu = () => {
  const isChanged = useSelector((state) => state.historyConfirmation.isActive);
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const name = useSelector((state) => state.treeview.selectedItem?.LAYER_NAME);
  const dispatch = useDispatch();
  const btnNew = () => {
    dispatch(cleanProjectData());
    dispatch(selectTreeViewItem(-2, "new", 2));
  };
  const save = () => {
    if (isChanged) {
      dispatch(
        setConfirmation({
          title: "Are you sure you want to save this ?",
          body: `${name ? name : "new"}`,
          agreefunction: async () => {
            dispatch(saveProject());
            dispatch(setIsActiveConfirmation(false));
          },
        })
      );
    }
  };

  const btnDelete = () => {
    dispatch(
      setConfirmation({
        title: "Are you sure you want to delete this ?",
        body: `${name ? name : "new"}`,
        agreefunction: () => {
          dispatch(deleteProject());
          dispatch(setIsActiveConfirmation(false));
        },
      })
    );
  };

  const saveGoPrev = () => {
    dispatch(selectTreeViewItem(selectedIndex - 1, "LAYER_NAME", 2));
  };

  const saveGoNext = () => {
    dispatch(selectTreeViewItem(selectedIndex + 1, "LAYER_NAME", 2));
  };

  return (
    <ActionMenu
      dublicateIsActive={false}
      infoIsActive={false}
      btnNew={btnNew}
      save={save}
      btnDelete={btnDelete}
      saveGoPrev={saveGoPrev}
      saveGoNext={saveGoNext}
    />
  );
};

export default ProjectActionMenu;
