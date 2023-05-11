import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { ActionMenu } from "../../../../components";

import { selectTreeViewItem } from "../../../../services/actions/treeview/treeview";
import { setConfirmation } from "../../../../services/reducers/confirmation";
import { setIsActiveConfirmation } from "../../../../services/actions/confirmation/historyConfirmation";

import {
  cleanWorkflowData,
  deleteWorkflow,
  saveWorkflow,
} from "../../../../services/actions/workflow/workflow";

const WorkflowsActionMenu = () => {
  const isChanged = useSelector((state) => state.historyConfirmation.isActive);
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const name = useSelector((state) => state.treeview.selectedItem?.NAME);
  React.useEffect(() => {
    console.log(selectedIndex);
  }, [selectedIndex]);
  const dispatch = useDispatch();
  const btnNew = () => {
    dispatch(cleanWorkflowData());
    dispatch(selectTreeViewItem(-2, "new", 2));
  };
  const save = () => {
    if (isChanged) {
      dispatch(
        setConfirmation({
          title: "Are you sure you want to save this ?",
          body: `${name ? name : "new"}`,
          agreefunction: async () => {
            dispatch(saveWorkflow());
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
          dispatch(deleteWorkflow());
          dispatch(setIsActiveConfirmation(false));
        },
      })
    );
  };

  const saveGoPrev = () => {
    dispatch(selectTreeViewItem(selectedIndex - 1, "NAME", 2));
  };

  const saveGoNext = () => {
    dispatch(selectTreeViewItem(selectedIndex + 1, "NAME", 2));
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
      saveIsDisabled={selectedIndex === -2}
    />
  );
};

export default WorkflowsActionMenu;
