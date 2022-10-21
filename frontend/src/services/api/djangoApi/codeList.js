import { instance, config } from "../../baseApi";


export const getParentCodeList = async (CULTURE) => {
    const body = JSON.stringify({ CULTURE, PARENT: "True" });
    try {
        let res = await instance
            .post(
                "/code-list/details/",
                body,
                config
            )
        return res;

    } catch (err) {
        return err
    }
}

export const getChildCodeList = async (LIST_TYPE, CULTURE) => {
    const body = JSON.stringify({ CULTURE, LIST_TYPE });
    console.log(body);
    try {
        let res = await instance
            .post(
                "/code-list/details/",
                body,
                config
            )
        return res;

    } catch (err) {
        return false
    }
}


export const deleteCodeListChild = async (LIST_TYPE,
    CULTURE,
    CODE,) => {
    const body = JSON.stringify({ LIST_TYPE, CULTURE, CODE });
    try {
        let res = await instance
            .delete(
                "/code-list/delete/",
                body,
                config
            )
        return res
    } catch (err) {
        return false
    }
}