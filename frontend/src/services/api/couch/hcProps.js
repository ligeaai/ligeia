import { config, instance } from "../../couchApi"

const get = (props) => {
    return instance.get(`/highchartproperties/${props}`, config);
};

const HcProps = {
    get,
};

export default HcProps;