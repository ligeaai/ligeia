import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MyCheckBox,
  MyTextField,
  MyNumberTextField,
  Select,
  ColorTextfield,
} from "../";

const InputGenerator = (props) => {
  const { type, changeFunction } = props;
  const defaultValue = useSelector(
    (state) => state.overviewDialog.highchartProps[props.title]
  );
  const dispatch = useDispatch();
  const handleChangeFunc = (val) => {
    dispatch(changeFunction(props.title, val));
  };
  const typeToInput = {
    text: (
      <MyTextField
        {...props}
        defaultValue={defaultValue}
        handleChangeFunc={handleChangeFunc}
      />
    ),
    checkbox: (
      <MyCheckBox
        {...props}
        defaultValue={defaultValue}
        handleChangeFunc={handleChangeFunc}
      />
    ),
    number: (
      <MyNumberTextField
        {...props}
        defaultValue={defaultValue}
        handleChangeFunc={handleChangeFunc}
      />
    ),
    select: (
      <Select
        {...props}
        defaultValue={defaultValue}
        handleChangeFunc={handleChangeFunc}
      />
    ),
    color: (
      <ColorTextfield
        {...props}
        defaultValue={defaultValue}
        handleChangeFunc={handleChangeFunc}
      />
    ),
  };
  const Element = typeToInput[type];

  return Element;
};

export default InputGenerator;
