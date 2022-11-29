import { instance, config } from "../baseApi"

const getAll = (body) => {
    return instance.post("/type/all/", body, config());
};



const TypeService = {
    getAll,
};


export default TypeService;