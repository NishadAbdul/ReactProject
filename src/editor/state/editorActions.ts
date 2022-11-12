export enum Actions {
    CURRENT_WORKSHEET_LOAD_BEGIN = "CURRENT_WORKSHEET_LOAD_BEGIN",
    CURRENT_WORKSHEET_LOAD_SUCCESS = "CURRENT_WORKSHEET_LOAD_SUCCESS",
    CURRENT_WORKSHEET_LOAD_FAILURE = "CURRENT_WORKSHEET_LOAD_FAILURE",

    CURRENT_WORKSHEET_SAVE_BEGIN = "CURRENT_WORKSHEET_SAVE_BEGIN",
    CURRENT_WORKSHEET_SAVE_SUCCESS = "CURRENT_WORKSHEET_SAVE_SUCCESS",
    CURRENT_WORKSHEET_SAVE_FAILURE = "CURRENT_WORKSHEET_SAVE_FAILURE",

    CURRENT_WORKSHEET_REMOVE_BEGIN = "CURRENT_WORKSHEET_REMOVE_BEGIN",
    CURRENT_WORKSHEET_REMOVE_SUCCESS = "CURRENT_WORKSHEET_REMOVE_SUCCESS",
    CURRENT_WORKSHEET_REMOVE_FAILURE = "CURRENT_WORKSHEET_REMOVE_FAILURE",

    WORKSHEET_DELETE_BEGIN = "WORKSHEET_DELETE_BEGIN",
    WORKSHEET_DELETE_SUCCESS = "WORKSHEET_DELETE_SUCCESS",
    WORKSHEET_DELETE_FAILURE = "WORKSHEET_DELETE_FAILURE",

    LIST_SUGGESTION_BEGIN = "LIST_SUGGESTION_BEGIN",
    LIST_SUGGESTION_SUCCESS = "LIST_SUGGESTION_SUCCESS",
    LIST_SUGGESTION_FAILURE = "LIST_SUGGESTION_FAILURE"
}

export const editorActionCreator = {
    listSuggestions(data: any, language: string) {
        return {
            type: Actions.LIST_SUGGESTION_BEGIN,
            payload: {
                value: data,
                language: language
            }
        };
    },
    loadCurrentWorksheet(data: any) {
        return {
            type: Actions.CURRENT_WORKSHEET_LOAD_BEGIN,
            payload: data
        };
    },
    saveCurrentWorksheet(data: any) {
        return {
            type: Actions.CURRENT_WORKSHEET_SAVE_BEGIN,
            payload: data
        };
    },
    removeCurrentWorksheet(){
        return {
            type: Actions.CURRENT_WORKSHEET_REMOVE_BEGIN
        };
    }
};