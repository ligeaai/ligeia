import axios from "axios";
import { instance, config } from "../baseApi"

const getAll = (body, cancelToken) => {
    return instance.get("/tags/details/", body, { ...config(), cancelToken: cancelToken.token });
};
let cancelToken;
const getTagItem = (body) => {
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    return instance.post("/tags/item/", body, { ...config(), cancelToken: cancelToken.token });
};

const getTagItemS = (body) => {
    return instance.post("/tags/item/", body, { ...config() });
};

const getTagsProperty = (body) => {
    return instance.post("/tags/tags-property/", body, config());
};

const createAndUpdate = (body) => {
    console.log(body);
    return instance.post("/tags/save/", body, config());
};

const remove = (body) => {
    return instance.post("/tags/delete/", body, config());
};

const importExel = (body) => {
    return instance.post(`/tags/import/`, body, config());
};

const deleteLogs = () => {
    return instance.get(`/tags/import/delete/`, config());
}
const workflow = (body) => {
    return instance.post(`/tags/item/tags/`, body, config());
}

const elasticSearch = (text, body, cancelToken) => {
    return instance.get(`/tags/es/${text}`, { ...config(), cancelToken: cancelToken.token });
};

const TagService = {
    elasticSearch,
    getAll,
    getTagItemS,
    getTagItem,
    getTagsProperty,
    createAndUpdate,
    importExel,
    deleteLogs,
    workflow,
    remove
};


export default TagService;