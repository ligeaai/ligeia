import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Stepper } from "../../../../components";

import StepperOne from "./stepperOne";
import StepperTwo from "./stepperTwo";
import StepperThree from "./stepperThree";
import { Box } from "@mui/material";

import {
  setBodyConfirmation,
  setSaveFunctonConfirmation,
  setTitleConfirmation,
} from "../../../../services/actions/confirmation/historyConfirmation";

import {
  saveWorkflow,
  cleanWorkflow,
  loadWorkflowProp,
} from "../../../../services/actions/workflow/workflow";
const Body = () => {
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const name = useSelector((state) => state.treeview.selectedItem.NAME);

  React.useEffect(() => {
    dispatch(setSaveFunctonConfirmation(saveWorkflow));
    dispatch(setTitleConfirmation("Are you sure you want to save this ? "));
    dispatch(setBodyConfirmation(`${name ? name : "new"}`));
    if (selectedIndex !== -3) dispatch(cleanWorkflow());
    if (selectedIndex !== -2 && selectedIndex !== -3) {
      dispatch(loadWorkflowProp());
    }
  }, [selectedIndex, name]);
  return (
    <Box className="workflow-container__body">
      <Stepper
        key={selectedIndex}
        components={() => {
          return [
            ["AA", <StepperOne />],
            ["BB", <StepperTwo />],
            ["CC", <StepperThree />],
          ];
        }}
        finishFunc={() => {
          dispatch(saveWorkflow());
        }}
      />
    </Box>
  );
};

export default Body;
