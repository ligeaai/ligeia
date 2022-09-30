import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import AppRouter from "../routers/appRouter";

import myTheme from "../themes/composeStyle";
import Loading from "../components/HOC/loading";
import { loadUser } from "../services/actions/auth";

import history from "../routers/history";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(loadUser()).then(() => {
        history.push("/")
      })
    }

  }, [])

  return (
    <ThemeProvider theme={myTheme()}>
      <Loading Element={<AppRouter />} />
    </ThemeProvider>
  );
};

export default App;
