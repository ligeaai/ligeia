import { instance, config } from "../baseApi";

const getAll = () => {
    return instance.get("/auth/user-list/", config());
};

const getLayers = () => {
    return instance.get("/layer/layer-dropdown/", config());
};

const createUser = (body) => {
    return instance.post("/auth/user/create/", body, config());
}

const updateUser = (body) => {
    return instance.post("/auth/user/layer/update/", body, config());
};

const removeUser = (body) => {
    return instance.post("/auth/user/remove/", body, config());
}

const getRoles = () => {
    return instance.get("/roles/get/", config());
}
const Users = {
    getAll,
    getRoles,
    getLayers,
    updateUser,
    removeUser,
    createUser
};


export default Users;