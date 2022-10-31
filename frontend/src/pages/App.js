import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import AppRouter from "../routers/appRouter";

import myTheme from "../themes/composeStyle";
import Loading from "../components/loading/loading";

import { ErrorBoundary } from "../components/errorMessage/errorBoundary"
import { setSelectedItem } from "../services/reducers/drawerReducer";
import { LicenseInfo } from "@mui/x-data-grid-pro";

LicenseInfo.setLicenseKey(
  "c637ab57aafc18858637cdde132c6c6fTz01MzI2NyxFPTE2OTg0OTQ5NTE2MjMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.location.pathname === "/") {
      dispatch(setSelectedItem("Home"))
    }
  }, [])

  return (
    <ErrorBoundary>
      <ThemeProvider theme={myTheme()}>
        <Loading Element={<AppRouter />} />
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
