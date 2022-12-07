import React from "react";
import { useDispatch } from "react-redux";
import {
  MyCheckBox,
  MyTextField,
  MyNumberTextField,
  Select,
  ColorTextfield,
} from "../";

const InputGenerator = (props) => {
  const { type, changeFunction } = props;
  const dispatch = useDispatch();
  const handleChangeFunc = (val) => {
    dispatch(changeFunction(props.title, val));
  };
  const typeToInput = {
    text: <MyTextField {...props} handleChangeFunc={handleChangeFunc} />,
    checkbox: <MyCheckBox {...props} handleChangeFunc={handleChangeFunc} />,
    number: (
      <MyNumberTextField {...props} handleChangeFunc={handleChangeFunc} />
    ),
    select: <Select {...props} handleChangeFunc={handleChangeFunc} />,
    color: <ColorTextfield {...props} handleChangeFunc={handleChangeFunc} />,
  };
  const Element = typeToInput[type];

  return Element;
};

export default InputGenerator;
