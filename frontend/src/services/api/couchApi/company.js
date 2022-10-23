import { instance, config } from "./baseUrl";


export const loadCompanyName = async () => {
    try {
        let res = await instance
            .get(
                "/companys/f2bbd6f29ce38f1a08c0d6c9ff00174f",
                config
            )
        return res;

    } catch (err) {
        return err
    }
}