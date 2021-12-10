
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
};