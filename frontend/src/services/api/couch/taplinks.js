import { config, instance } from "../../couchApi"

const update = (selectedLink, body) => {
    return instance.put(`/taplinks/${selectedLink}`, body, config);
};

const get = (linkId) => {
    return instance.get(`/taplinks/${linkId}`, config);
};

const create = (body) => {
    return instance.post(`/taplinks/`, body, config);
};

const TabLink = {
    update,
    get,
    create
};

export default TabLink;