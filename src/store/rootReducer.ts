import { combineReducers } from 'redux';

import dashboardReducer from './../dashboard/state/dashboardReducer';
import editorReducer from './../editor/state/editorReducer';

const rootReducer = combineReducers({
    dashboard: dashboardReducer,
    editor: editorReducer
});

export default rootReducer;