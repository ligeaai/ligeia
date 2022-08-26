import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import history from "../../routers/history";

import { reset_password } from "../../services/actions/auth";
import styles from "../../assets/Styles/pages/resetpassword/resetpassword";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [passVisible, setPassVisible] = useState(true);
  const [password, setPassword] = useState({
    eposta: "",
    password: "",
  });

  const navigate = (e, route) => {
    e.preventDefault();
    history.push(`${route}`);
  };

  const onChangeFactory = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={styles().box}>
      <Typography sx={styles().header}>Enter a new password</Typography>
      <Typography>
        Create a new password that is at least 6 characters long. A strong
        password is a combination of letters, numbers, and punctuation.
      </Typography>
      <OutlinedInput
        name="eposta"
        placeholder={"Enter eposta"}
        value={password.eposta}
        sx={styles().input}
        onChange={onChangeFactory}
      />
      <OutlinedInput
        name="password"
        placeholder={"Enter new password"}
        type={passVisible ? "text" : "password"}
        value={password.password}
        sx={styles().input}
        onChange={onChangeFactory}
        endAdornment={
          <InputAdornment
            position="end"
            sx={styles().cursorPointer}
            onClick={() => {
              setPassVisible(!passVisible);
            }}
          >
            {passVisible[1] ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </InputAdornment>
        }
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={styles().button}
            onClick={async (e) => {
              (await dispatch(
                reset_password(password.eposta, password.password)
              )) ? (
                <></>
              ) : (
                navigate(e, "/")
              );
            }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResetPassword;
