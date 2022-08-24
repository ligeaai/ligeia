const Styles = () => ({
    box: {
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
                width: "550px",
                boxShadow: "0px 4px 20px rgba(194, 194, 194, 0.25)",
                backgroundColor: "#ffffff",
            },
        },
    },
    text: {
        fontWeight: "300",
        mb: 3,
        mt: 2.5
    },
    email: {
        fontWeight: "300",
        mb: 2.5,
        ml: 4
    },
    phone: {
        fontWeight: "300",
        mb: 4,
        ml: 4
    },
    btnNextPhone: {
        width: "100%",
        mb: 3,
        typography: {
            xs: {
                display: "block",
            },
            sm: {
                display: "none",
            },
        }
    },
    boxNoMoreAccess: {
        width: 1,
        typography: {
            xs: {
                textAlign: "center",
            },
            sm: {
                textAlign: "left",
            },
        }
    },
    body: {
        position: "relative",
        typography: {
            xs: {
                display: "none",
            },
            sm: {
                display: "inline-block",
            },
        },
    },
    bodyBox: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        textAlign: "center",
    },
    btnNextPc: {
        position: "fixed",
        right: "20px",
        bottom: "20px",
        padding: "9px 52px",
        typography: {
            xs: {
                display: "none",
            },
            sm: {
                display: "inline-block",
            },
        },
    }
})


export default Styles