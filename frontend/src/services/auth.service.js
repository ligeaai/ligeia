<<<<<<< HEAD

import axios from "axios";


const register = (first_name, last_name, email, password) => {
    return axios.post("http://127.0.0.1:8000/api/v1/accounts/register/", {
        first_name,
        last_name,
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post("http://127.0.0.1:8000/api/v1/accounts/login/", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};


const changePassword = (old_password, new_password1, new_password2) => {
    return axios.patch()
};

export default {
    register,
    login,
    logout,
    changePassword
=======

import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1/accounts/";

const register = (first_name, last_name, email, password) => {
    return axios.post("http://127.0.0.1:8000/api/v1/accounts/register/", {
        first_name,
        last_name,
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post("http://127.0.0.1:8000/api/v1/accounts/login/", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
};