import React, {Component} from "react";
import {Typography} from "@mui/material";
import axios from "axios";

export default class Database extends Component {
  state = {
    persons: [],
  };

  componentDidMount() {
    axios.get(`http://192.168.1.110:8000/api/v1/`)
    .then((res) => {
      console.log()
    });
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}
