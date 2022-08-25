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
                width: "360px",
                boxShadow: "0px 4px 20px rgba(194, 194, 194, 0.25)",
                backgroundColor: "#ffffff",
            },
        },
    },
    header: {
        typography: {
            xs: {
                display: "none"
            },
            sm: {
                display: "block"
            }
        },
    },
    inputLabel: {
        mb: 1,
        mt: 2.5
    },
    input: {
        width: "100%", backgroundColor: "#ffffff"
    },
    btnSignIn: {
        width: "100%",
        mt: 2.5
    }
})


export default Styles