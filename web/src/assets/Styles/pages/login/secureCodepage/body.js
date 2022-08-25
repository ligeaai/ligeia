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
        }
    },
    subtitle: {
        fontWeight: "300",
        mb: 3
    },
    input: {
        mb: 2.5,
        backgroundColor: "#ffffff",
        width: "100%"
    },
    btnNext: {
        padding: "8px 54px"
    }
})


export default Styles