import axios from "axios";

const getAll = () => {
    return axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/code_list/`
    })
};

export {getAll};