import { instance, config } from "../baseApi"


const getAll = (body, cancelToken, type) => {
    return instance.get(`/item/details/${type}`, { ...config(), cancelToken: cancelToken.token });
};

const getAllItems = (type) => {
    return instance.get(`/item/details/${type}`, config());
};


const getTypeProperty = (body, cancelToken) => {
    return instance.post(
        "/type/details/", body, { ...config(), cancelToken: cancelToken.token }
    )
}

const getItemValues = (body, cancelToken) => {
    return instance.post(
        "/item-property/details/", body, { ...config(), cancelToken: cancelToken.token }
    )
}

const update = (body) => {
    return instance.post(
        "/item/item-and-property/", body, config()
    )
}

const create = (body) => {
    return instance.post(
        "/item/create/", body, config()
    )
}

const remove = (body) => {
    return instance.post(
        "/item/delete/", body, config()
    )
}

const elasticSearch = (text, body, cancelToken) => {
    return instance.post(`/item-property/es/`, body, { ...config(), cancelToken: cancelToken.token });
};


const ItemService = {
    getAll,
    getAllItems,
    getTypeProperty,
    getItemValues,
    create,
    update,
    remove,
    elasticSearch
};

export default ItemService;