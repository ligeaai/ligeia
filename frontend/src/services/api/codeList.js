import axios from "axios";
import { instance, config } from "../baseApi"

const getAllTreeitem = (body) => {
    return instance.post("/code-list/details/parent", body, config());
};

let cancelToken;
const getCodelistDetail = (body) => {
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    return instance.post("/code-list/deep-details/", body, { ...config(), cancelToken: cancelToken.token });
};

const createUpdate = (body) => {
    return instance.put("/code-list/save-update/", body, config());
};

const remove = (body) => {
    return instance.post("/code-list/delete/", body, config());
};


const CodelistService = {
    getAllTreeitem,
    getCodelistDetail,
    createUpdate,
    remove,
};


export default CodelistService;