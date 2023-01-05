import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionMenu } from "../../../../../components";

import {
    deleteResourceList,
    saveResourceList,
    saveAndMoveResourceList,
    addNewResourceListItemSchema,
} from "../../../../../services/actions/resource/datagridResource";
import {
    setConfirmation,
    setExtraBtn,
} from "../../../../../services/reducers/confirmation";
import ConfirmResourceDataGrid from "./confirmResourceDatagrid";
import { selectTreeViewItem } from "../../../../../services/actions/treeview/treeview";
import { setIsActiveConfirmation } from "../../../../../services/actions/confirmation/historyConfirmation";

const ResourceListActionMenu = () => {
    const changedRows = useSelector(
        (state) => state.dataGridResourceList.changedRows
    );
    const deletedRows = useSelector(
        (state) => state.dataGridResourceList.deletedRows
    );
    const selectedIndex = useSelector(
        (state) => state.treeview.selectedItem.selectedIndex
    );
    const dispatch = useDispatch();
    const btnNew = () => {
        if (changedRows.length !== 0 || deletedRows.length !== 0) {
            dispatch(
                setConfirmation({
                    title: "Are you sure you want to save this resource list?",
                    body: <ConfirmResourceDataGrid />,
                    agreefunction: async () => {
                        dispatch(saveResourceList());
                        dispatch(addNewResourceListItemSchema());
                        dispatch(setIsActiveConfirmation(false));
                    },
                })
            );
            dispatch(
                setExtraBtn({
                    extraBtnText: "Don't save go",
                    extrafunction: () => {
                        dispatch(addNewResourceListItemSchema());
                        dispatch(setIsActiveConfirmation(false));
                    },
                })
            );
        } else {
            dispatch(addNewResourceListItemSchema());
        }
    };
    const save = () => {
        if (changedRows.length !== 0 || deletedRows.length !== 0) {
            dispatch(
                setConfirmation({
                    title: "Are you sure you want to save this resource list?",
                    body: <ConfirmResourceDataGrid />,
                    agreefunction: async () => {
                        dispatch(saveResourceList());
                        dispatch(setIsActiveConfirmation(false));
                    },
                })
            );
        }
    };

    const btnDelete = () => {
        dispatch(
            setConfirmation({
                title: "Are you sure you want to delete this resource list?",
                body: <ConfirmResourceDataGrid />,
                agreefunction: () => {
                    dispatch(deleteResourceList());
                    dispatch(setIsActiveConfirmation(false));
                },
            })
        );
    };

    const saveGoPrev = () => {
        dispatch(selectTreeViewItem(selectedIndex - 1, "PARENT"));
    };

    const saveGoNext = () => {
        dispatch(selectTreeViewItem(selectedIndex + 1, "PARENT"));
    };

    return (
        <ActionMenu
            dublicateIsActive={false}
            infoIsActive={false}
            btnNew={btnNew}
            save={save}
            btnDelete={btnDelete}
            saveGoPrev={saveGoPrev}
            saveGoNext={saveGoNext}
        />
    );
};

export default ResourceListActionMenu;
