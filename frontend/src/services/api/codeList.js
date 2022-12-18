import axios from "axios";
import { instance, config } from "../baseApi"

const getAllTreeitem = (body, cancelToken) => {
    return instance.post("/code-list/details/parent", body, { ...config(), cancelToken: cancelToken.token });
};

let cancelToken;
const getCodelistDetail = (body) => {
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    console.log(body);
    return instance.post("/code-list/deep-details/", body, { ...config(), cancelToken: cancelToken.token });
};

const createUpdate = (body) => {
    return instance.put("/code-list/save-update/", body, config());
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



const CodelistService = {
    getAllTreeitem,
    getCodelistDetail,
    createUpdate,
    remove,
    details,
    getItemPropCode
};


export default CodelistService;

