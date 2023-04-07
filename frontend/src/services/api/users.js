import { instance, config } from "../baseApi";

const getAll = () => {
    return instance.get("/auth/user-list", config());
};

const getLayers = () => {
    return instance.get("/layer/layer-dropdown/", config());
};

const updateUser = (body) => {
    return instance.post("/auth/user/layer/update", body, config());
};

const Users = {
    getAll,
    getLayers,
    updateUser
};


export default Users;