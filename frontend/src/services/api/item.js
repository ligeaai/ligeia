import { instance, config } from "../baseApi"


const getAll = (body, cancelToken, type) => {
    return instance.get(`/item/details/${type}`, { ...config(), cancelToken: cancelToken.token });
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

const ItemService = {
    getAll,
    getTypeProperty,
    getItemValues
};

export default ItemService;