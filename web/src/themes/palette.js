import { useSelector } from "react-redux";
import { grey } from "@material-ui/core/colors"
const Palette = () => {
    const theme = useSelector((state) => state.theme.theme);
    const palette = {
        mode: theme,
        ...(theme === "light" ? {
            myBackgroundColor: "#ffffff",
            myCanvasBg: "#FAFCFF",
            myTextColor: "#42526E",
            myReverseText: "#ffffff",
            myCardFancyColor: "#42526E",
            myCardFancyColorHover: "#458BF3",
        } : {
            myBackgroundColor: "#202020",
            myCanvasBg: "#181818",
            myTextColor: "#BB86FC",
            myReverseText: "#000000",
            myCardFancyColor: grey[800],
            myCardFancyColorHover: grey[600],
        })
    }
    return (
        palette
    )
}

export default Palette