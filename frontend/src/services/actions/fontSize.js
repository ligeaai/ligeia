import $ from "jquery"

export const applyFontSize = () => {
    $("html").css({ "font-size": localStorage.getItem('fontsize') ? `${localStorage.getItem('fontsize')}px` : "10px" })
}