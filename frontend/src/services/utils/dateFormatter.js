export function dateFormatter(date) {
    var d = date.getDate();
    var m = date.getMonth();
    m += 1;
    var y = date.getFullYear();
    var newdate = (y + "-" + m + "-" + d);
    return newdate
}

function addZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
}

export function dateFormatDDMMYYHHMM(date) {
    var d = date.getDate();
    var m = date.getMonth();
    m += 1;
    var y = date.getFullYear();
    var h = addZero(date.getHours());
    var min = addZero(date.getMinutes());
    var newdate = d + "/" + m + "/" + y + " " + h + ":" + min;
    return newdate
}