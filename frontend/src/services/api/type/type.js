import { instance, config } from "../../baseApi";


export const loadType = async (TYPE, CULTURE) => {
    const body = JSON.stringify({
        CULTURE,
        TYPE,
    });

    try {
        let res = await instance
            .post(
                "/type/details/", body, config
            )
        return res;

    } catch (err) {
        return err
    }
}