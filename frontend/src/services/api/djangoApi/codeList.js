import { instance, config } from "../../baseApi";


export const getParentCodeList = async (CULTURE) => {
    const body = JSON.stringify({ CULTURE, LIST_TYPE: "CODE_LIST" });
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


export const getParentCode = async (CULTURE, ROW_ID) => {
    const body = JSON.stringify({ CULTURE, ROW_ID });
    try {
        let res = await instance
            .post(
                "/code-list/details/",
                body,
                config
            )
        var i = 0;
        return res.data[0]



    } catch (err) {
        return err
    }
}

export const getChildCodeList = async (LIST_TYPE, CULTURE) => {
    const body = JSON.stringify({ CULTURE, LIST_TYPE });
    var mydata = { data: {} }
    try {
        let res = await instance
            .post(
                "/code-list/details/",
                body,
                config
            )

        return res;

    } catch (err) {
        console.log("asdsad");
        return "failed"
    }
}


export const deleteCodeList = async (ROW_ID) => {
    const body = JSON.stringify({ ROW_ID });
    console.log(body);
    try {
        let res = await instance
            .post(
                "/code-list/delete/",
                body,
                config
            )
        return res
    } catch (err) {
        return false
    }
}

export const putCodeList = async (CODE, CODE_TEXT, CULTURE, LIST_TYPE, ROW_ID) => {
    const body = JSON.stringify({ LIST_TYPE, CULTURE, CODE, CODE_TEXT, ROW_ID });
    console.log(body);
    try {
        let res = await instance
            .put(
                "/code-list/save/",
                body,
                config
            )
        return res
    } catch (err) {
        return false
    }
}