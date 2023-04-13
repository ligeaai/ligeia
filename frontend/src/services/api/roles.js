import { instance, config } from "../baseApi";

const getAll = (body, cancelToken) => {
    return instance.get("/roles/get/", { ...config(), cancelToken: cancelToken.token });
}

const getRoles = () => {
    return instance.get("/roles/get/", config());
}

const getType = () => {
    return instance.get("/roles-type/get/", config());
};

const getRoleProp = (body) => {
    return instance.post("/roles/get/property/", body, config());
};

const saveRole = (body) => {
    return instance.post("/roles/save/", body, config());
};

const removeRole = (body) => {
    return instance.post("/roles/delete/", body, config());
};

const getRoleLink = (body, cancelToken) => {
    return instance.post("/auth/users/get/roleid/", body, { ...config(), cancelToken: cancelToken.token });
};

const removeRoleLink = (body) => {
    return instance.post("/auth/user/role/delete/", body, config());
};

const updateRoleLink = (body) => {
    return instance.post("/auth/user/role/update/", body, config());
};

const getRolelessUser = () => {
    return instance.get("/auth/users/roles/", config());
};

const Roles = {
    getAll,
    getRoles,
    getType,
    saveRole,
    getRoleProp,
    removeRole,
    getRoleLink,
    removeRoleLink,
    updateRoleLink,
    getRolelessUser
};


export default Roles;