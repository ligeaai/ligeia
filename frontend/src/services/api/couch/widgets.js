import { config, instance } from "../../couchApi"

const get = (e) => {
    return instance.get(`/widgets/${e}`, config);
};

const create = (body) => {
    return instance.post(`/widgets/`, body, config);
};

const update = (id, body) => {
    return instance.put(`/widgets/${id}`, body, config);
};

const remove = (id, revId) => {
    return instance.delete(`/widgets/${id}?rev=${revId}`, config);
};

const Widgets = {
    get,
    create,
    update,
    remove
};

export default Widgets;