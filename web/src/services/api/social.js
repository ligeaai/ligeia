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

const myGoogleLogin = async (response) => {
    console.log(response);
    let res = await axios.post(
        "http://localhost:8000/auth/google/",
        {
            access_token: response.accessToken,

            id_token: response.xc.id_token,
        }
    );
    console.log(res);
    return await res.status;
};

const myGithubLogin = async (response) => {

    let res = await axios.post(
        "http://localhost:8000/auth/github/",
        {
            access_token: response.accessToken,

        }
    );
    console.log(res);
    return await res.status;
};

export { myFacebookLogin, myGoogleLogin, myGithubLogin };