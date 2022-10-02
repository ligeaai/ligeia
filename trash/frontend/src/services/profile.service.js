import axios from "axios";
import authHeader from "./auth-header";


const updatePassword = (data) => {

    return axios.patch(`http://127.0.0.1:8000/api/v1/accounts/change-password/`, data, { headers: authHeader() });
};


const ProfileService = {
    updatePassword
}

export default ProfileService