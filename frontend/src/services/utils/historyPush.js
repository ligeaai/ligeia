import history from "../../routers/history";
export const myHistoryPush = (index, value) => {
    var pathnames = window.location.pathname.split("/").filter((x) => x);
    pathnames[index] = value
    var routeTo = "";
    pathnames.map(e => {
        routeTo += `/${e}`
    });
    history.push(routeTo);
}