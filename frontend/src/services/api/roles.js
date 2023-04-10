import { instance, config } from "../baseApi";

const getAll = (body, cancelToken) => {
    return instance.get("/roles/get/", { ...config(), cancelToken: cancelToken.token });
}

const getType = () => {
    return instance.get("/roles-type/get/", config());
};

const getRoleProp = (body) => {
    return instance.post("/roles-property/get/", body, config());
};

const saveRole = (body) => {
    return instance.post("/roles/save/", body, config());
};

const removeRole = (body) => {
    return instance.post("/roles/delete/", body, config());
};
const Roles = {
    getAll,
    getType,
    saveRole,
    getRoleProp,
    removeRole
};


export default Roles;