import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { Actions } from './state/editorActions';
import { EditorContainer } from './EditorContainer';

const fetchSuggestions = function* (action: any) {
    try {
        // console.log('at editorSaga - fetchSugestions with action: ', action);
        const result: any[] = yield EditorContainer.listSuggestionsAsync(action.payload.value, action.payload.language);
        yield put({
            type: Actions.LIST_SUGGESTION_SUCCESS,
            payload: result
        });
    } catch (error) {
        yield put({
            type: Actions.LIST_SUGGESTION_FAILURE,
            error: error
        });
    }
};

const loadCurrentWorksheet = function* (action: any) {
    try {
        // console.log('at DashboardSaga - loadCurrentWorksheet with action: ', action);
        let result;
        yield axios.get('http://localhost:5001/leaf/' + action.payload.activeWorksheetId)
        .then(res => {
            result = res.data
        });
        // console.log('at DashboardSaga - loadCurrentWorksheet with result: ', result);
        yield put({
            type: Actions.CURRENT_WORKSHEET_LOAD_SUCCESS,
            payload: result
        });
    } catch (error) {
        yield put({
            type: Actions.CURRENT_WORKSHEET_LOAD_FAILURE,
            error: error
        });
    }
};

const postEditedContent = function* (action: any) {
    try {
        // console.log('at EditorSaga - postEditedContent with action: ', action);
        yield axios.post(`http://localhost:5001/leaf`, { name: action.payload.name, cateogry: action.payload.category, type: action.payload.type, content: action.payload.content })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        yield put({
            type: Actions.CURRENT_WORKSHEET_SAVE_SUCCESS
        });
    } catch (error) {
        yield put({
            type: Actions.CURRENT_WORKSHEET_SAVE_FAILURE,
            error: error

        });
    }
};

const putEditedContent = function* (action: any) {
    try {
        // console.log('at EditorSaga - putEditedContent with action: ', action);
        yield axios.put('http://localhost:5001/leaf/' + action.payload.activeWorksheetId, action.payload.content)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
        yield put({
            type: Actions.CURRENT_WORKSHEET_SAVE_SUCCESS
        });
    } catch (error) {
        yield put({
            type: Actions.CURRENT_WORKSHEET_SAVE_FAILURE,
            error: error

        });
    }
};

const fetchSuggestionsWatch = function* () {
    yield takeLatest(Actions.LIST_SUGGESTION_BEGIN, fetchSuggestions);
};

const loadCurrentWorksheetWatch = function* () {
    yield takeLatest(Actions.CURRENT_WORKSHEET_LOAD_BEGIN, loadCurrentWorksheet);
};

const postEditedContentWatch = function* () {
    yield takeLatest(Actions.CURRENT_WORKSHEET_SAVE_BEGIN, /*postEditedContent*/putEditedContent);
};

export {
    fetchSuggestionsWatch,
    postEditedContentWatch,
    loadCurrentWorksheetWatch
};