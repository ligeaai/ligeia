import { instance, config } from "../baseApi"
import axios from "axios";
const getAll = (body, cancelToken) => {
    return instance.post("/type/all/", body, { ...config(), cancelToken: cancelToken.token });
};
let cancelToken;
const getTypeAndProperty = (body) => {
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    return instance.post("/type/editor/", body, { ...config(), cancelToken: cancelToken.token });
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