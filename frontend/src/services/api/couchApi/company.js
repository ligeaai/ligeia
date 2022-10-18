import { instance, config } from "./baseUrl";


export const loadCompanyName = async () => {
    try {
        let res = await instance
            .get(
                "/companys/4a6dcc4d57a4927110e6ca815e001bda",
                config
            )
        return res;

    } catch (err) {
        return err
    }
}