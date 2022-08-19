import React, { useState } from "react";
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

import history from "../../routers/history";

import { signup } from "../../services/actions/auth";

const navigate = (e, route) => {
  e.preventDefault();
  history.push(`${route}`);
};

const Body = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState([
    {
      email: "",
      name: "",
      surname: "",
      password: "",
      repassword: "",
    },
  ]);
  const [passVisible, setPassVisible] = useState(false);
  const [repassVisible, setRePassVisible] = useState(false);

  return (
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
        Sign up
      </Typography>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Email
      </Typography>
      <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
        <OutlinedInput
          placeholder={"Email"}
          value={user[0].email}
          onChange={(e) => {
            user[0].email = e.target.value;
            setUser([...user]);
          }}
        />
      </FormControl>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Name
      </Typography>
      <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
        <OutlinedInput
          placeholder={"Name"}
          value={user[0].name}
          onChange={(e) => {
            user[0].name = e.target.value;
            setUser([...user]);
          }}
        />
      </FormControl>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Surname
      </Typography>
      <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
        <OutlinedInput
          placeholder={"Surname"}
          value={user[0].surname}
          onChange={(e) => {
            user[0].surname = e.target.value;
            setUser([...user]);
          }}
        />
      </FormControl>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Password
      </Typography>
      <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
        <OutlinedInput
          placeholder={`Password`}
          type={passVisible ? "text" : "password"}
          value={user[0].password}
          onChange={(e) => {
            user[0].password = e.target.value;
            setUser([...user]);
          }}
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

      <Typography variant="h6" sx={{ mb: 1 }}>
        Repassword
      </Typography>
      <FormControl sx={{ width: "100%", backgroundColor: "#ffffff" }}>
        <OutlinedInput
          placeholder={`Repassword`}
          type={repassVisible ? "text" : "password"}
          value={user[0].repassword}
          onChange={(e) => {
            user[0].repassword = e.target.value;
            setUser([...user]);
          }}
          endAdornment={
            <InputAdornment
              position="end"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setRePassVisible(!repassVisible);
              }}
            >
              {repassVisible ? (
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
          await dispatch(
            signup(
              user[0].email,
              user[0].name,
              user[0].surname,
              user[0].password
            )
          );
          navigate(e, "/");
        }}
      >
        Sign Up
      </Button>
      <Button
        onClick={(e) => {
          navigate(e, "/login");
        }}
      >
        Sign in
      </Button>
    </Box>
  );
};

export default Body;
