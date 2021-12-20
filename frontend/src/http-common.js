<<<<<<< HEAD
import axios from "axios";

export default axios.create({

    baseURL: "http://127.0.0.1:8000/",

=======
import axios from "axios";
import authHeader from "./services/auth-header";


export default axios.create({

    baseURL: "http://127.0.0.1:8000/",
    headers: {
        Authorization: "Token bbebb7f5d13f8b90d4f1aad37897c0f8c1e839729daa6c902d73b9b254b24234"
    }
>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
});