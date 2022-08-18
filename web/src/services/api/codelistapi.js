import axios from "axios";
//credentials: true,
const getAll = () => {
    //let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');

    // headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
    // headers.append('Access-Control-Allow-Credentials', 'null');

    // headers.append('GET', 'POST', 'OPTIONS');
    return axios({
        url: "http://localhost:8000/en/api/v1/code_list/",
        method: "GET",
        // headers: headers

    })
};

export { getAll };