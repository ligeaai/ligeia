import { instance, config } from "./baseUrl";


export const loadCompanyName = () => {
    try {
        let res = instance
            .get(
                "/company/72f6a6e538b3eab5255aa16ff60071e0",
                config
            )
        return res;

    } catch (err) {
        console.log(err);
    }
}