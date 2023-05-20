import axios from "axios";
import { instance, config } from "../baseApi"

const getAllTreeitem = (body, cancelToken) => {
    return instance.post("/code-list/details/parent/", body, { ...config(), cancelToken: cancelToken.token });
};

let cancelToken;
const getCodelistDetail = (body) => {
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    return instance.post("/code-list/deep-details/", body, { ...config(), cancelToken: cancelToken.token });
};

const create = (body) => {
    return instance.post("/code-list/save/", body, config());
};

const update = (body) => {
    return instance.post("/code-list/update/", body, config());
};

const remove = (body) => {
    return instance.post("/code-list/delete/", body, config());
};

const details = (body) => {
    return instance.post("/code-list/details/", body, config());
};

const getItemPropCode = (body) => {
    return instance.post("code-list/property-code/", body, config());
};


const getCultures = () => {
    return instance.get("/code-list/culture/", config());
};

const elasticSearch = (text, body, cancelToken) => {
    return instance.post(`/code-list/es/`, body, { ...config(), cancelToken: cancelToken.token });
};


const CodelistService = {
    getAllTreeitem,
    getCodelistDetail,
    create,
    update,
    remove,
    details,
    getItemPropCode,
    elasticSearch,
    getCultures
};


export default CodelistService;

