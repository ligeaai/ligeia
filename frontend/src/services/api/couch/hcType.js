import { config, instance } from "../../couchApi"

const get = () => {
    return instance.get(`/highcharttype/57b054aedfcb4984da539444110006b6`, config);
};

const HcType = {
    get,
};

export default HcType;