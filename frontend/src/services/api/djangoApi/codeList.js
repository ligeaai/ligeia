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


export const getParentCode = async (CULTURE, CODE) => { //todo edit when new api arrives
    const body = JSON.stringify({ CULTURE, LIST_TYPE: "CODE_LIST" });
    try {
        let res = await instance
            .post(
                "/code-list/details/",
                body,
                config
            )
        var i = 0;
        while (true) {
            if (res.data[i].CODE === CODE) {
                console.log(res.data[i]);
                return res.data[i]
            }
            if (i === 300) {
                break
            }
            i++;
        }



    } catch (err) {
        return err
    }
}

export const getChildCodeList = async (LIST_TYPE, CULTURE) => {
    const body = JSON.stringify({ CULTURE, LIST_TYPE });
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


export const deleteCodeList = async (LIST_TYPE,
    CULTURE,
    CODE,) => {
    const body = JSON.stringify({ LIST_TYPE, CULTURE, CODE });
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