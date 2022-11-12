import { applyMiddleware, createStore } from 'redux';
// import logger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

let initialState: any = {};
let store: any;

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware, /*logger*/));
  } else {
    store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
  }

  sagaMiddleware.run(rootSaga);
  store.close = () => store.dispatch(END);
  return store;
}

export { store };
