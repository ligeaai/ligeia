import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import history from "../../../routers/history";
import langPicker from "../LangPicker";

import { login } from "../../../services/actions/auth";
import ErrorMessage from "../../../components/HOC/errorMessage";

const navigate = (e, route) => {
  e.preventDefault();
  history.push(`${route}`);
};

const Body = () => {
  const dispatch = useDispatch();
  const [errMsg, setErrMsg] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [passVisible, setPassVisible] = useState(false);
  const text = langPicker();
  const onChangeFactory = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setTimeout(() => {
      if (errMsg) {
        setErrMsg(false);
      }
    }, 3000);
  }, [errMsg]);
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          p: 2.5,
          transform: "translate(-50%,-50%)",
          borderRadius: "10px",
          typography: {
            xs: {
              width: "100%",
              boxSizing: "border-box",
              backgroundColor: "transparent",
              boxShadow: "none",
            },
            sm: {
              width: "360px",
              boxShadow: "0px 4px 20px rgba(194, 194, 194, 0.25)",
              backgroundColor: "#ffffff",
            },
          },
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            typography: { xs: { display: "none" }, sm: { display: "block" } },
            mb: 2.5,
          }}
        >
          {text.body.authorization}
        </Typography>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {text.body.username}
        </Typography>
        <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
          <OutlinedInput
            name="email"
            placeholder={`${text.body.usernameInput}`}
            value={user.email}
            onChange={onChangeFactory}
          />
        </FormControl>
        <Typography variant="h6" sx={{ mb: 1, mt: 2.5 }}>
          {text.body.password}
        </Typography>
        <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
          <OutlinedInput
            name="password"
            placeholder={`${text.body.passwordInput}`}
            type={passVisible ? "text" : "password"}
            value={user.password}
            onChange={onChangeFactory}
            endAdornment={
              <InputAdornment
                position="end"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setPassVisible(!passVisible);
                }}
              >
                {passVisible ? (
                  <VisibilityOffOutlinedIcon />
                ) : (
                  <VisibilityOutlinedIcon />
                )}
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          variant="contained"
          sx={{ width: "100%", mt: 2.5 }}
          onClick={async (e) => {
            e.preventDefault();
            let err = await dispatch(login(user.email, user.password));
            err ? setErrMsg(err.message) : navigate(e, "/");
          }}
        >
          {text.body.signIn}
        </Button>
        <Button
          onClick={(e) => {
            navigate(e, "/login/passrecovery");
          }}
        >
          Wrong pass
        </Button>
        <Button
          onClick={(e) => {
            navigate(e, "/signup");
          }}
        >
          Sign Up
        </Button>
      </Box>
      <ErrorMessage errMsg={errMsg} />;
    </>
  );
};

export default Body;
