const styles = () => ({

    paper: {
        margin: "50px auto",
        padding: "40px",
        height: "400px",
        width: "400px",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1) !important"
    },

    customButton: {
        width: "400px",
        height: "50px",
        backgroundColor: "#458bf3 !important",
        borderRadius: "10px",
        fontWeight: "medium",
        textTransform: "none",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        marginTop: "30px !important"
    },

    buttonTypography: {
        textTransform: "none",
        fontSize: "24px !important",
        fontWeight: "700"
    },

    customLink: {
        textDecoration: "none",
        '&:visited': {
            color: "#458bf3"
        }
    },

    Logo: {
        '&:hover': {
            backgroundColor: "#F8F8F8",
            borderRadius: "5px",
        },
        '&:active': {
            backgroundColor: "#F8F8F8",
            borderRadius: "5px"
        }
    }
})

export default styles