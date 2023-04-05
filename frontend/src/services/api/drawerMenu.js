import { instance, config } from "../baseApi"

const get = (body, isEmployee) => {
    if (isEmployee)
        return instance.post("/resource-list/menu/user/", body, config());
    return instance.post("/resource-list/menu/", body, config());
};

const DrawerMenu = {
    get,
};

export default DrawerMenu;