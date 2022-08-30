import axios from "axios";
import { add_error } from '../actions/error';

const getAllUsers = () => async dispatch => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    const body = JSON.stringify({ token: localStorage.getItem('token') });
    try {
        const temp = await axios.get(
            "http://localhost:8000/api/v1/auth/users/",
            body,
            config,
        )
        return temp;
    } catch (err) {
        dispatch(add_error(err.message))
    }
};

export { getAllUsers };