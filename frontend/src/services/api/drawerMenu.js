import { instance, config } from "../baseApi"

const get = (body) => {
    return instance.post("/resource-list/test/", body, config());
};

const DrawerMenu = {
    get,
};

export default DrawerMenu;