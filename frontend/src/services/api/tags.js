import axios from "axios";
import { instance, config } from "../baseApi"

const getAll = (body, cancelToken) => {
    return instance.get("/tags/details/", body, { ...config(), cancelToken: cancelToken.token });
};

const TagService = {
    getAll,

};


export default TagService;