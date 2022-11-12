export enum Actions{
    WORKSHEETS_LOAD_BEGIN = "WORKSHEETS_LOAD_BEGIN",
    WORKSHEETS_LOAD_SUCCESS = "WORKSHEETS_LOAD_SUCCESS",
    WORKSHEETS_LOAD_FAILURE = "WORKSHEETS_LOAD_FAILURE",

    SELECTED_WORKSHEET_SAVE_BEGIN = "SELECTED_WORKSHEET_SAVE_BEGIN",
    SELECTED_WORKSHEET_SAVE_SUCCESS = "SELECTED_WORKSHEET_SAVE_SUCCESS",
    SELECTED_WORKSHEET_SAVE_FAILURE = "SELECTED_WORKSHEET_SAVE_FAILURE"
}

export const dashboardActionCreator = {
    listWorksheets() {
        return {
            type: Actions.WORKSHEETS_LOAD_BEGIN
        };
    },
    saveCurrentWorksheet(data: any, id: number) {
        return {
            type: Actions.SELECTED_WORKSHEET_SAVE_BEGIN,
            payload: {
                content: data,
                id: id
            }
        };
    }
}