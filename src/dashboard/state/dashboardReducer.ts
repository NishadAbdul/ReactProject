import { Actions } from './dashboardActions';
import IWorksheet from './../../editor/types/IWorksheet';

interface IDashboardState {
    worksheets: [] | any | null,
}

let initalState: IDashboardState = {
    worksheets: []
};

const dashboardReducer = (state = initalState, action: any) => {
    switch (action.type) {
        case Actions.WORKSHEETS_LOAD_BEGIN:
            return {
                ...state,
                worksheets: [
                    ...state.worksheets
                    // {
                    //     id: '611535b7d9ce6ad16c98a347',
                    //     name: 'investigation thriller #1',
                    //     description: 'nothing so far',
                    //     // content: 'SCENE 1, EXT:അമിനി വില്ലയിൽ അന്ന് ഒരു murder നടന്നു '
                    // },
                    // {
                    //     id: '611569597f7bf9040941f042',
                    //     name: 'family drama #1',
                    //     description: 'yeah, lot of fun...',
                    //     // content: 'SCENE 1, EXT: സായം സന്ധ്യ ചുവപ്പിച്ച ആ താഴ്വരയിലൂടെ ആ പാവം അച്ഛൻ നടന്നു മറഞ്ഞു.'
                    // }
                ]
            };
            break;
        case Actions.WORKSHEETS_LOAD_SUCCESS:
            // console.log('at dashboardReducer - worksheets_load_success with action: ', action);
            return {
                ...state,
                worksheets: action.payload
            }
            break;
        // case Actions.SELECTED_WORKSHEET_SAVE_BEGIN:
        //     const index = state.worksheets.findIndex((worksheet: IWorksheet) => worksheet.id === action.payload.id);

        //     if (index > -1) {
        //         const updatedWorksheets = state.worksheets.slice();

        //         return {
        //             ...state,
        //             worksheets: [
        //                 ...state.worksheets.slice(0, index),
        //                 {
        //                     id: updatedWorksheets[index].id,
        //                     name: updatedWorksheets[index].name,
        //                     description: updatedWorksheets[index].description,
        //                     content: action.payload.content
        //                 },
        //                 ...state.worksheets.slice(index + 1)
        //             ]
        //         };
        //     }
        //     else {
        //         return state;
        //     }
        //     break;
    
        default:
            return state;
    }
};

export default dashboardReducer;