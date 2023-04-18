import { instance, config } from "../baseApi"

const get = (body) => {
    return instance.post("/resource-drawer/menu/", body, config());
};

const DrawerMenu = {
    get,
};

export default DrawerMenu;