
import { instance, config } from "../baseApi"

const hierarchy = () => {
    return instance.get("/item-link/hierarchy/", config());
};

const getLinkSchema = (body, cancelToken) => {
    return instance.post("/type-link/details/", body, { ...config(), cancelToken: cancelToken.token });
};

const getItemLink = (body, cancelToken) => {
    return instance.post("/item-link/details/", body, { ...config(), cancelToken: cancelToken.token });
};

const remove = (body) => {
    return instance.post("/item-link/delete/", body, config());
};

const update = (body) => {
    return instance.put("/item-link/update/", body, config());
};


const ItemLinkService = {
    hierarchy,
    getLinkSchema,
    getItemLink,
    remove,
    update
};

export default ItemLinkService;