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

const getTags = (body) => {
    return instance.post("/item-link/tags/", body, config())
}
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
    getTags,
    remove,
    update
};

export default ItemLinkService;