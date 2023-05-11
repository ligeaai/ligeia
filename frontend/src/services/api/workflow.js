import { instance, config } from "../baseApi"


const getAll = (body, cancelToken) => {
    return instance.get(`/workflows/get/`, { ...config(), cancelToken: cancelToken.token });
};

const getItemValues = (body, cancelToken) => {
    return instance.get(
        `/workflows/get/${body}/`, { ...config(), cancelToken: cancelToken.token }
    )
}

const update = (body) => {
    return instance.post(
        "/workflows/update/", body, config()
    )
}

const create = (body) => {
    return instance.post(
        "/workflows/create/", body, config()
    )
}

const remove = (body) => {
    return instance.post(
        "/workflows/delete/", body, config()
    )
}

const elasticSearch = (text, body, cancelToken) => {
    return instance.post(``, body, { ...config(), cancelToken: cancelToken.token });
};


const WorkflowService = {
    getAll,
    getItemValues,
    create,
    update,
    remove,
    elasticSearch
};

export default WorkflowService;