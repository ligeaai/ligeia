import React from "react";

import { updateData } from "../../../../services/actions/workflow/workflow";
import Assets from "../../../../components/workflow/assets";
import { useDispatch } from "react-redux";

const StepperTwo = () => {
  const dispatch = useDispatch();
  const handleChangeFunc = (props) => {
    dispatch(updateData("ITEM_ID", props));
  };

  return <Assets handleChangeFunc={handleChangeFunc} />;
};

export default StepperTwo;
