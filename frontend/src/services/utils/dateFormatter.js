export function dateFormatter(date) {
    var d = date.getDate();
    var m = date.getMonth();
    m += 1;
    var y = date.getFullYear();
    var newdate = (y + "-" + m + "-" + d);
    return newdate
}

export function dateFormatterDDMMYY(date) {
    var d = date.getDate();
    var m = date.getMonth();
    m += 1;
    var y = date.getFullYear();
    var newdate = (d + "-" + m + "-" + y);
    return newdate
}

export const swapDayAndYear = (props) => {
    return `${props[6]}${props[7]}${props[8]}${props[9]}-${props[3]}${props[4]}-${props[0]}${props[1]}`
}

export function dateFormatterDMY(date) {
    var d = date.getDate();
    var m = date.getMonth();
    m += 1;
    var y = date.getFullYear();
    var newdate = (d + "." + m + "." + y);
    return newdate
}

function addZero(i) {
    if (i < 10) { i = "0" + i }
    return i;
}

export function dateFormatDDMMYYHHMM(date) {
    var d = addZero(date.getDate());
    var m = date.getMonth();
    m += 1;
    m = addZero(m)
    var y = date.getFullYear();
    var h = addZero(date.getHours());
    var min = addZero(date.getMinutes());
    var newdate = d + "." + m + "." + y + " " + h + ":" + min;
    return newdate
}

export function dateFormatDDMMYYHHMMSS(date) {
    var s = addZero(date.getSeconds());
    const dateDDMMYYHHMM = dateFormatDDMMYYHHMM(date);
    console.log(s);
    var newdate = dateDDMMYYHHMM + ":" + s;
    return newdate
}

export function newDate(date) {
    var date = date.split("-");
    var day = date[0];
    var month = date[1];
    var year = date[2];
    return new Date(year, month - 1, day);
}   