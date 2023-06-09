import axios from "axios";
import { instance, config } from "../baseApi"

const getAllTreeitem = (body, cancelToken) => {
    return instance.post("/resource-list/parent/", body, { ...config(), cancelToken: cancelToken.token });
};

let cancelToken;
const getResourcelistDetail = (body) => {
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    return instance.post("/resource-list/hierarchy/", body, { ...config(), cancelToken: cancelToken.token });
};

const createUpdate = (body) => {
    return instance.put("/resource-list/save-update/", body, config());
};

const remove = (body) => {
    return instance.post("/resource-list/delete/", body, config());
};

const details = (body) => {
    return instance.post("/resource-list/details/", body, config());
};

const getItemPropCode = (body) => {
    return instance.post("resource-list/property-code/", body, config());
};

const elasticSearch = (text, body, cancelToken) => {
    return instance.post(`/resource-list/es/`, body, { ...config(), cancelToken: cancelToken.token });
};


const resourceList = {
    getAllTreeitem,
    getResourcelistDetail,
    createUpdate,
    remove,
    details,
    getItemPropCode,
    elasticSearch
};


export default resourceList;

