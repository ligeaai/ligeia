import { instance, config } from "./baseUrl";


export const loadCompanyName = async () => {
    try {
        let res = await instance
            .get(
                "/companys/174bef3d5b000c9b243a2c35cd0027ec",
                config
            )
        return res;

    } catch (err) {
        return err
    }
}