import ItemLinkService from "../../api/itemLink";

const helperRequest = async (checkedItems, linkType, type) => {
    for (let i = 0; i < checkedItems.length; i++) {
        const body = JSON.stringify({
            LINK_TYPE: linkType,
            [type]: checkedItems[i].ITEMS_ID,
        });
        let res = await ItemLinkService.cardinalityCheck(body);
        if (res.data) {
            return false
        }
    }
    return true
}

// in From cardinaliy => * to cardinality => 1
//out TO cardinaliy => 1 to cardinality => *
const oneToMany = async (checkedItems, linkType, type) => {
    return await helperRequest(checkedItems, linkType, type)
}

// in From cardinaliy => 1 to cardinality => *
//out TO cardinaliy => * to cardinality => 1
const manyToOne = async (checkedItems, linkType, type, selectedItem) => {
    if (checkedItems.length > 1) {
        return false
    }
    return await helperRequest(selectedItem, linkType, type)
}

const oneToOne = async (checkedItems, linkType, type, selectedItem) => {
    if (!await oneToMany(checkedItems, linkType, type))
        return false
    if (!await manyToOne(checkedItems, linkType, type, selectedItem))
        return false
    return true
}

const cardinalityCheckType = (TYPE, selectedValue) => {
    const fromCardinality = selectedValue.FROM_CARDINALITY
    const toCardinality = selectedValue.TO_CARDINALITY
    if (fromCardinality === "*" && toCardinality === "1") {
        if (TYPE === "FROM_TYPE")
            return oneToMany
        else return manyToOne
    }
    else if (fromCardinality === "1" && toCardinality === "*") {
        if (TYPE === "FROM_TYPE")
            return manyToOne
        else return oneToMany
    }
    else if (fromCardinality === "*" && toCardinality === "*") {
        return true
    }
    else if (fromCardinality === "1" && toCardinality === "1") {
        return oneToOne
    }
}

export const cardinalityCheck = (linkType, type, selectedValue) => async (dispatch, getState) => {
    const checkedItems = getState().checkedList.checkedItems;
    const selectedItemId = getState().treeview.selectedItem.ITEM_ID;
    const TYPE = type === "TO_ITEM_ID" ? "FROM_TYPE" : "TO_TYPE";
    if (!selectedValue) {
        return false
    }
    return await cardinalityCheckType(TYPE, selectedValue)(checkedItems, linkType, type, [{ ITEMS_ID: selectedItemId }])
}
