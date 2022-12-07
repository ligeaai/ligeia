
import { instance, config } from "../baseApi"


const hierarchy = () => {
    return instance.get("/item-link/hierarchy/", config());
};


const ItemLinkService = {
    hierarchy,
};

export default ItemLinkService;