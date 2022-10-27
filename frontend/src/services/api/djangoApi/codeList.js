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
    const body = JSON.stringify({ ROW_ID });
    try {
        let res = await instance
            .post(
                "/code-list/deep-details/",
                body,
                config
            )
        return res



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

export const putCodeList = async (CODE, CODE_TEXT, CULTURE, LIST_TYPE, ROW_ID, PARENT, LEGACY_CODE, VAL1,
    // VAL2,
    //VAL3, VAL4, VAL5, VAL6, VAL7, VAL8, VAL9, VAL10, DATE1, DATE2, DATE3, DATE4, DATE5, CHAR1, CHAR2, CHAR3, CHAR4, CHAR5,
    LAYER_NAME
    //, DESCRIPTION_ID, HIDDEN, LAST_UPDT_USER, LAST_UPDT_DATE
) => {
    const body = JSON.stringify({
        LIST_TYPE, CULTURE, CODE, CODE_TEXT, ROW_ID, PARENT, LEGACY_CODE, VAL1,
        // VAL2,
        // VAL3, VAL4, VAL5, VAL6, VAL7, VAL8, VAL9, VAL10, DATE1, DATE2, DATE3, DATE4, DATE5, CHAR1, CHAR2, CHAR3, CHAR4, CHAR5,
        LAYER_NAME,
        // DESCRIPTION_ID, HIDDEN, LAST_UPDT_USER, LAST_UPDT_DATE
    });
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