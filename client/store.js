// @module store.js

import { legacy_createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/reducer.js';

const store = legacy_createStore(
    reducers,
    composeWithDevTools()
);

export default store;

