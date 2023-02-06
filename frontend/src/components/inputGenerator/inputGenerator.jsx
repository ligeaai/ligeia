import React from "react";
import {
  MyCheckBox,
  MyTextField,
  MyNumberTextField,
  Select,
  ColorTextfield,
} from "../";

const InputGenerator = (props) => {
  const { type, changeFunction, defaultValue } = props;

  const typeToInput = {
    text: (
      <MyTextField
        {...props}
        defaultValue={defaultValue}
        handleChangeFunc={changeFunction}
      />
    ),
    checkbox: (
      <MyCheckBox
        {...props}
        defaultValue={defaultValue}
        handleChangeFunc={changeFunction}
      />
    ),
    number: (
      <MyNumberTextField
        {...props}
        defaultValue={defaultValue}
        handleChangeFunc={changeFunction}
      />
    ),
    select: (
      <Select
        {...props}
        defaultValue={defaultValue}
        handleChangeFunc={changeFunction}
      />
    ),
    color: (
      <ColorTextfield
        {...props}
        defaultValue={defaultValue}
        handleChangeFunc={changeFunction}
      />
    ),
  };
  const Element = typeToInput[type];

  return Element;
};

export default InputGenerator;
