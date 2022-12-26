import { useSelector } from "react-redux";
import { grey, red, green, lime, indigo, teal, cyan, blueGrey } from "@material-ui/core/colors"
import { useState } from 'react';
import { createMuiTheme } from "@mui/material/styles"




const Palette = () => {
    const theme = useSelector((state) => state.theme.theme);


    const palette = {

        mode: theme,
        ...(theme === "light" ? {

            primary: {
                light: "#ffffff",
                main: "#42526E",
                dark: "#819ca9", //header
            },

            success: {
                primary: "#607d8b", // card fancy color
                main: "#676767", // selected item for light
                secondary: "#e0e0e0", // drawer menu bacground

            },

            text: {
                primary: "#364868", // drawer menu text
                main: "#546e7a", // select item for drawer text
                secondary: "#616161", // card header text
                success: "#9e9e9e", //card info text
            },


            background: {
                primary: "#b0bec5", // drawer menu select item background
                main: "#eeeeee", // paper background
                secondary: "#e0e0e0", // nested menu background
                success: "#e0e0e0", // card Background
            },


            hover: {
                primary: "#cfd8dc", // nested menu hover
                main: "#f44336",
                secondary: "#00897b", // card fancy hover
            },


            status: {
                main: "#616161", //items 
                primary: "#e0e0e0" // items text

            },



            myBackgroundColor: "#ffffff",
            myTreeViewBg: "#ffffff",
            myCanvasBg: "#FAFCFF",
            myTextColor: "#42526E",
            myReverseText: "#ffffff",
            myCardFancyColor: "#42526E",
            myCardFancyColorHover: "#458BF3",
            myBoldText: "#364868",
            myLightText: "#7B809A",

        } : {

            primary: {
                light: "#9E9E9E",
                main: "#424242",
                dark: "#455a64", // DarkHeader
            },

            success: {
                primary: "#424242", // card fancy dark color
                main: "#ffffff", //selected item for dark
                secondary: "#424242", // drawer bg for dark
            },

            text: {
                primary: "#cfd8dc", // drawer menu text for dark
                main: "#eceff1", // select item for drawer text for dark
                secondary: "#eeeeee", // card header text for dark
                success: "#e0e0e0", //card info text for dark
            },

            background: {
                primary: "#616161", //  drawer menu select item background for dark
                main: "#757575", //  paper background for dark
                secondary: "#616161", //nested menu dark background
                success: "#9e9e9e", // card bg dark
            },

            status: {
                main: "#616161", //items 
                primary: "#e0e0e0" // items text

            },


            hover: {
                primary: "#757575", // nested menu hover for dark
                main: "#f44336",
                secondary: "#607d8b", // card hover for dark
            },


            myBackgroundColor: "#424242",
            myTreeViewBg: "#9E9E9E",
            myCanvasBg: "black",
            myTextColor: "#BB86FC",
            myReverseText: "#000000",
            myCardFancyColor: grey[800],
            myCardFancyColorHover: grey[600],
            myBoldText: "#364868",
            myLightText: "#7B809A",
        })
    }
    return (
        palette
    )
}

export default Palette