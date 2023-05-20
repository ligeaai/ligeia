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
import { setConfirmation } from "../../../../services/reducers/confirmation";
import { setIsActiveConfirmation } from "../../../../services/actions/confirmation/historyConfirmation";
const Body = () => {
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const name = useSelector((state) => state.treeview.selectedItem.NAME);
  const isChanged = useSelector((state) => state.historyConfirmation.isActive);
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
        }}
      />
    </Box>
  );
};

export default Body;
