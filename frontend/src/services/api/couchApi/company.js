import { instance, config } from "./baseUrl";


export const loadCompanyName = async () => {
    try {
        let res = await instance
            .get(
                "/company/8d9fb35ab3dc4aa2ff9392eb4b0012e6",
                config
            )
        return res;

    } catch (err) {
        return err
    }
}