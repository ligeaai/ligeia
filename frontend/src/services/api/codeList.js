import { instance, config } from "../baseApi"

const getAllTreeitem = (body) => {
    return instance.post("/code-list/details/parent", body, config());
};

const getCodelistDetail = (body) => {
    return instance.post("/code-list/deep-details/", body, config());
};

const createUpdateType = (body) => {
    return instance.post("/code-list/save-editor/", body, config());
};

const createUpdateProperty = (body) => {
    return instance.post("/code-list-property/save-update/", body, config());
};

const deleteType = (body) => {
    return instance.post("/code-list/delete/", body, config());
};

const deleteProperty = (body) => {
    return instance.post("/code-list-property/delete/", body, config());
};



const CodelistService = {
    getAllTreeitem,
    getCodelistDetail,
    createUpdateType,
    createUpdateProperty,
    deleteType,
    deleteProperty
};


export default CodelistService;