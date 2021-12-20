<<<<<<< HEAD
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    return { Authorization: "Token " + user.token };


=======
import { useSelector } from "react-redux";


export default function AuthHeader() {
    const { user: currentUser } = useSelector((state) => state.authReducer);
    return ({
        Authorization: 'Token' + currentUser.token
    })
>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
}