const Styles = () => ({
    box: {
        position: "absolute",
        left: "50%",
        top: "50%",
        padding: "20px",
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
                width: "525px",
                boxShadow: "0px 4px 20px rgba(194, 194, 194, 0.25)",
                backgroundColor: "#ffffff",
            },
        },
    },
    header: {
        mb: 2,
        fontWeight: "500"
    },
    input: {
        width: "100%",
        mb: 2.5,
        mt: 2
    },
    cursorPointer: {
        cursor: "pointer"
    },
    button: {
        width: "100%"
    }

})


export default Styles