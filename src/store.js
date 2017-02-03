import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducers = require('./reducers/index').default;

// Create Store
let store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;
