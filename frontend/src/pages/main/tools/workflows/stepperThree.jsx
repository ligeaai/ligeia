import React from "react";

import { updateData } from "../../../../services/actions/workflow/workflow";
import Tags from "../../../../components/workflow/tags";
import { useDispatch } from "react-redux";

const StepperThree = () => {
  const dispatch = useDispatch();
  const handleChangeFunc = (props) => {
    dispatch(updateData("TAG_ID", props));
  };

  return <Tags handleChangeFunc={handleChangeFunc} />;
};

export default StepperThree;
