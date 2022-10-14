import { instance, config } from "./baseUrl";


export const loadCompanyName = async () => {
    try {
        let res = await instance
            .get(
                "/company/a3e0a015661f1b35103cd012d7001388",
                config
            )
        return res;

    } catch (err) {
        return err
    }
}