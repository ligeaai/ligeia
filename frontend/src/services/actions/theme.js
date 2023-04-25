import $ from "jquery"
export const changeTheme = (theme) => dispatch => {
    $("body").removeClass()
    $("body").addClass(localStorage.getItem('theme') ? `${localStorage.getItem('theme')}` : "theme-light")
    dispatch({
        type: "theme/changeTheme",
        payload: theme,
    })
}

export const applyTheme = () => {
    $("body").removeClass()
    $("body").addClass(localStorage.getItem('theme') ? `${localStorage.getItem('theme')}` : "theme-light")
}