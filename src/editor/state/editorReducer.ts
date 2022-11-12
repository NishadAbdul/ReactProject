import { Actions } from './editorActions';
import IWorksheet from './../types/IWorksheet';

interface IEditorState {
    activeWorksheet: IWorksheet | null,
    suggestions: [] | any | null
}

let initialState: IEditorState = {
    activeWorksheet: null,
    suggestions: []
};

const editorReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case Actions.CURRENT_WORKSHEET_LOAD_BEGIN:
            // console.log('at editorReducer - CURRENT_WORKSHEET_LOAD_BEGIN with action is ', action, ' and filtered result is ', action.payload.worksheets.filter((item: IWorksheet) => item.id == action.payload.activeWorksheetId));
            return {
                ...state,
                // activeWorksheet: action.payload.worksheets.filter((item: IWorksheet) => item.id == action.payload.activeWorksheetId)[0]
                activeWorksheet: {
                    ...state.activeWorksheet
                }
            };
            break;
        case Actions.CURRENT_WORKSHEET_LOAD_SUCCESS:
            return {
                ...state,
                activeWorksheet: {
                    id: action.payload._id,
                    name: action.payload.name,
                    content: action.payload.content
                }
            }
            break;
        case Actions.CURRENT_WORKSHEET_SAVE_BEGIN:
            return {
                ...state,
                activeWorksheet: {
                    ...state.activeWorksheet
                }
            };
            break;
        case Actions.CURRENT_WORKSHEET_REMOVE_BEGIN:
            return {
                ...state,
                activeWorksheet: null
            };
            break;
        case Actions.LIST_SUGGESTION_BEGIN:
            return {
                ...state,
                activeWorksheet: {
                    ...state.activeWorksheet,
                    suggestions: action.payload
                }
            };
            break;
    
        default:
            return state;
    }
};

export default editorReducer;