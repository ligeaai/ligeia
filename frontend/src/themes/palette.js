import { useSelector } from "react-redux";
import { grey } from "@material-ui/core/colors"
const Palette = () => {
    const theme = useSelector((state) => state.theme.theme);
    const palette = {
        mode: theme,
        ...(theme === "light" ? {
            myBackgroundColor: "#ffffff",
            myTreeViewBg: "#ffffff",
            myCanvasBg: "#FAFCFF",
            myTextColor: "#42526E",
            myReverseText: "#ffffff",
            myCardFancyColor: "#42526E",
            myCardFancyColorHover: "#458BF3",
            myBoldText: "#364868",
            myLightText: "#7B809A"
        } : {
            myBackgroundColor: "#424242",
            myTreeViewBg: "#9E9E9E",
            myCanvasBg: "black",
            myTextColor: "#BB86FC",
            myReverseText: "#000000",
            myCardFancyColor: grey[800],
            myCardFancyColorHover: grey[600],
            myBoldText: "#364868",
            myLightText: "#7B809A"
        })
    }
    return (
        palette
    )
}

export default Palette