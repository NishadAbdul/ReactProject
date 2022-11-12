import { all } from 'redux-saga/effects';

import { fetchSuggestionsWatch, postEditedContentWatch, loadCurrentWorksheetWatch } from './../editor/EditorSaga';
import { loadWorksheetsWatch } from './../dashboard/DashboardSaga';

export default function* rootSaga() {
    yield all([
        fetchSuggestionsWatch(),
        postEditedContentWatch(),
        loadCurrentWorksheetWatch(),
        loadWorksheetsWatch()
    ]);
}