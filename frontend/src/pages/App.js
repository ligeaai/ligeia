import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import AppRouter from "../routers/appRouter";

import myTheme from "../themes/composeStyle";
import Loading from "../components/loading/loading";

import { LicenseInfo } from "@mui/x-data-grid-pro";
LicenseInfo.setLicenseKey(
  "c637ab57aafc18858637cdde132c6c6fTz01MzI2NyxFPTE2OTg0OTQ5NTE2MjMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const App = () => {

  return (
    <ThemeProvider theme={myTheme()}>
      <Loading Element={<AppRouter />} />
    </ThemeProvider>
  );
};

export default React.memo(App);
