import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAllUsers } from "../../../services/api/user";

const Allusers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(dispatch(getAllUsers()));
  }, []);
  return <div>allusers</div>;
};

export default Allusers;
