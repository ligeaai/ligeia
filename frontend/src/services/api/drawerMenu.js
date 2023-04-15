import { instance, config } from "../baseApi"

const get = (body) => {
    return instance.post("/resource-list/menu/", body, config());
};

const DrawerMenu = {
    get,
};

export default DrawerMenu;