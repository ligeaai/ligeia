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
    btnContainer: {
        typography: {
            xs: { justifyContent: "space-between" },
            sm: { justifyContent: "normal" },
        },
    },
    btnNext: {
        padding: "8px 54px"
    },
    btnCancel: {
        padding: "8px 44px"
    }
})


export default Styles