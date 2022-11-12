import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { Actions } from './state/dashboardActions';

const loadWorksheets = function* (action: any) {
    try {
        let result;
        yield axios.get('http://localhost:5001/leaf')
        .then(res => {
            result = res.data
        });
        yield put({
            type: Actions.WORKSHEETS_LOAD_SUCCESS,
            payload: result
        });
    } catch (error) {
        yield put({
            type: Actions.WORKSHEETS_LOAD_FAILURE,
            error: error
        });
    }
};

const loadWorksheetsWatch = function* () {
    yield takeLatest(Actions.WORKSHEETS_LOAD_BEGIN, loadWorksheets);
};

export {
    loadWorksheetsWatch
};