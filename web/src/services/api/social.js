import axios from "axios";

const myFacebookLogin = async (accesstoken) => {
    let res = await axios.post(
        "http://localhost:8000/rest-auth/facebook/",
        {
            access_token: accesstoken,
        }
    );
    console.log(res);
    return await res.status;
};

const myGoogleLogin = async (accesstoken) => {
    console.log(accesstoken);
    let res = await axios.post(
        "http://localhost:8000/rest-auth/google/",
        {
            access_token: accesstoken,
        }
    );
    console.log(res);
    return await res.status;
};

export { myFacebookLogin, myGoogleLogin };