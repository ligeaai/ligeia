import $ from "jquery"

const list = {
    Small: "12px",
    Medium: "14px",
    Large: "18px",
}

export const applyFontSize = () => {
    $("html").css({ "font-size": localStorage.getItem('fontsize') ? list[`${localStorage.getItem('fontsize')}`] : "10px" })
}