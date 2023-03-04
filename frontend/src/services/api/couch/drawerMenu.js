import { config, instance } from "../../couchApi"

const get = () => {
    return instance.get(`/drawermenu/d770fc23c7a9bba2a6e3c15a5f02c8b8/`, config);
};

const DrawerMenu = {
    get,
};

export default DrawerMenu;