import { instance, config } from "./baseUrl";


export const loadCompanyName = async () => {
    try {
        let res = await instance
            .get(
                "/company/421d561488633d5d467f77f3450014f7",
                config
            )
        return res;

    } catch (err) {
        return err
    }
}