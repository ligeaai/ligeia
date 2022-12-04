export function dateFormatter(date) {
    var d = date.getDate();
    var m = date.getMonth();
    m += 1;
    var y = date.getFullYear();
    var newdate = (y + "-" + m + "-" + d);
    return newdate
}