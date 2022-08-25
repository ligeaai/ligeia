const Styles = () => ({
    box: {
        position: "fixed",
        bottom: "0",
        backgroundColor: "#ffffff",
        width: "100%",
        py: 1,
    },
    flexBox: {
        typography: {
            xs: { justifyContent: "center" },
            sm: {
                flexDirection: "row-reverse",
                justifyContent: "space-between",
            },
        },
    },
    link: {
        textDecoration: "none",
        mr: 2.5
    },
    navItem: {
        display: "inline",
        typography: {
            xs: { fontSize: "12px" },
            sm: { fontSize: "20px" },
        },
    },
    text: {
        pl: 2.5,
        typography: {
            xs: {
                justifyContent: "space-between"
            },
        }
    },
    textItem: {
        typography: {
            xs: {
                fontSize: "12px",
                justifyContent: "space-between"
            },
            sm: { fontSize: "20px" },
        }
    },
    langSelector: {
        typography: {
            xs: { display: "inline-block" },
            sm: { display: "none" },
        },
    }


})


export default Styles