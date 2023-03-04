import { instance, config, unAuthConfig } from "../baseApi"

const get = () => {
    return instance.get("/auth/user-detail", config());
};

const login = (body) => {
    return instance.post("/auth/login/", body, unAuthConfig);
};

const register = (body) => {
    return instance.post("/auth/register/", body, unAuthConfig);
};

const forgetPass = (body) => {
    return instance.post(`/auth/Forget-password/`, body, unAuthConfig);
};

const resetNewPass = (token, body) => {
    return instance.post(`/auth/reset-new-password/${token}/`, body, unAuthConfig);
};

const logout = () => {
    return instance.get("/auth/logout/", config());
};

const socialLogin = (text, path, body) => {
    return instance.post(`/auth/${text}/${path}/`, body, unAuthConfig);
};

const Auth = {
    get,
    login,
    register,
    forgetPass,
    resetNewPass,
    logout,
    socialLogin
};


export default Auth;

