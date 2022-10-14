import { instance, config } from "../../baseApi";


export const loadType = async (TYPE) => {
    const body = JSON.stringify({
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