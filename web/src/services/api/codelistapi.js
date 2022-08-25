import axios from "axios";

const getAll = () => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    const body = JSON.stringify({ token: localStorage.getItem('token') });

    return axios.get(
        "http://localhost:8000/api/v1/code_list/code_list/",
        body,
        config,
    )


};

const getWithLISTTYPE = async (id) => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    const body = JSON.stringify({ token: localStorage.getItem('token') });

    const temp = await axios.get(
        `http://localhost:8000/api/v1/code_list/code_list/`,
        body,
        config,
    )
    return temp.data[id];


};

export { getAll, getWithLISTTYPE };