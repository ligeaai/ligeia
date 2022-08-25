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

const deleteCodeList = async (id) => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    const body = JSON.stringify({ token: localStorage.getItem('token') });

    await axios.delete(
        `http://localhost:8000/api/v1/code_list/code_list/${id}`,
        body,
        config,
    )
};

const addCodeList = async (data) => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    const body = JSON.stringify(data);;

    await axios.post(
        `http://localhost:8000/api/v1/code_list/code_list/`,
        body,
        config,
    )
};

const updateCodeList = async (id, data) => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    const body = JSON.stringify(data);;
    console.log(data);
    console.log(id);
    await axios.put(
        `http://localhost:8000/api/v1/code_list/code_list/${id}/`,
        body,
        config,
    )
};

export { addCodeList, deleteCodeList, getAll, getWithLISTTYPE, updateCodeList };