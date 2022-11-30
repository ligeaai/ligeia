import { instance, config } from "../baseApi"

const getAll = (body) => {
    return instance.post("/type/all/", body, config());
};

const getTypeAndProperty = (body) => {
    return instance.post("/type/editor/", body, config());
};

const createUpdateType = (body) => {
    return instance.post("/type/save-editor/", body, config());
};

const createUpdateProperty = (body) => {
    return instance.post("/type-property/save-update/", body, config());
};

const deleteType = (body) => {
    return instance.post("/type/delete/", body, config());
};

const deleteProperty = (body) => {
    return instance.post("/type-property/delete/", body, config());
};



const TypeService = {
    getAll,
    getTypeAndProperty,
    createUpdateType,
    createUpdateProperty,
    deleteType,
    deleteProperty
};


export default TypeService;