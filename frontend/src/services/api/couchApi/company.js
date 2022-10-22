import { instance, config } from "./baseUrl";


export const loadCompanyName = async () => {
    try {
        let res = await instance
            .get(
                "/companys/f9f355714e5c5115ad4e0bc943001697",
                config
            )
        return res;

    } catch (err) {
        return err
    }
}