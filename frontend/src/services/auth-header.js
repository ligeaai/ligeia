import { useSelector } from "react-redux";


export default function AuthHeader() {
    const { user: currentUser } = useSelector((state) => state.authReducer);
    return ({
        Authorization: 'Token' + currentUser.token
    })
}