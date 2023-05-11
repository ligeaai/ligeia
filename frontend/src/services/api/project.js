import { instance, config } from "../baseApi"


const getAll = (body, cancelToken) => {
    return instance.get(`/project/get/`, { ...config(), cancelToken: cancelToken.token });
};

const getItemValues = (body, cancelToken) => {
    return instance.get(
        `/project/get/${body}/`, { ...config(), cancelToken: cancelToken.token }
    )
}

const update = (body) => {
    return instance.post(
        "/project/update/", body, config()
    )
}

const create = (body) => {
    return instance.post(
        "/project/create/", body, config()
    )
}

const remove = (body) => {
    return instance.post(
        "/project/delete/", body, config()
    )
}

const elasticSearch = (text, body, cancelToken) => {
    return instance.post(``, body, { ...config(), cancelToken: cancelToken.token });
};


const ProjectService = {
    getAll,
    getItemValues,
    create,
    update,
    remove,
    elasticSearch
};

export default ProjectService;