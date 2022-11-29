import {
    SET_ROW_DATAGRID_TYPE,
    SET_CHANGE_TYPE_VALUE_CELL_TAG,
    AFTER_GO_INDEX_TYPE
} from "../../actions/types"


const rows = []
const initialState = {
    rows: rows,
    propertyRows: rows,
    changedRows: [],
    deletedRows: [],
    selectedRows: [],
    newChildRows: [],
    anyChangesType: false,
    anyChangesProperty: false
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case SET_ROW_DATAGRID_TYPE:
            const rows = []
            payload.map((e) => {
                rows[e.ROW_ID] = e
            })
            console.log(payload);
            return {
                ...state,
                rows: rows
            }
        case SET_CHANGE_TYPE_VALUE_CELL_TAG:
            return {
                ...state,
                rows: {
                    ...state.rows, [payload.id]: {
                        ...state.rows[payload.id], [payload.field]: payload.value
                    }
                },
                // changedRows: {
                //     ...state.changedRows, [payload.id]: {
                //         ...state.changedRows[payload.id], [payload.field]: payload.value
                //     }
                // },
                anyChanges: true
            }
        case AFTER_GO_INDEX_TYPE:
            return {
                ...state,
                changedRows: [],
                deletedRows: [],
                selectedRows: [],
                newChildRows: [],
                anyChanges: false,
                anyChangesProperty: false
            }
        default:
            return {
                ...state,
            }
    }
};
