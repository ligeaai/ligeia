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
    return instance.post("/tags/save/", body, config());
};

const remove = (body) => {
    return instance.post("/tags/delete/", body, config());
};

const TagService = {
    getAll,
    getTagItemS,
    getTagItem,
    getTagsProperty,
    createAndUpdate,
    remove
};


export default TagService;