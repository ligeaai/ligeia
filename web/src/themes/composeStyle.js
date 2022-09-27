import { createTheme } from "@mui/material/styles";
import palette from "./palette";
import themeTypography from "./typography";

const ComposeStyle = () => {

    const myTheme = createTheme({
        palette: palette(),
        typography: themeTypography()
    });
    return myTheme
}

export default ComposeStyle



