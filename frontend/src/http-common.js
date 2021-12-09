import axios from "axios";
import authHeader from "./services/auth-header";


export default axios.create({

    baseURL: "http://127.0.0.1:8000/",
    headers: {
        Authorization: "Token 3ea2930e80e13bcdc61bf5f5ba9fbcfeaf222d8459bc0f7da37e6bee6adf3802"
    }
});