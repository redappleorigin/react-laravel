import 'isomorphic-fetch';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './middleware/promiseMiddleware';
import createReducer from './createReducer';

export function configureStore (initialState, history) {
    const middleware = [
        thunk,
        promiseMiddleware,
        routerMiddleware(history),
    ];

    let store;

    if (__DEV__ && __CLIENT__) {
        const createLogger = require('redux-logger');

        middleware.push(createLogger());

        store = createStore(createReducer(), initialState, compose(
            applyMiddleware(...middleware),

            typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
        ));
    } else {
        store = createStore(createReducer(), initialState, compose(applyMiddleware(...middleware), f => f));
    }

    store.asyncReducers = {};

    if (__DEV__ && __CLIENT__ && module.hot) {
        module.hot.accept('./createReducer', () => {
            const nextReducer = require('./createReducer').default;

            store.replaceReducer(nextReducer());
        });
    }

    return store;
}

export function injectAsyncReducer (store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;

    store.replaceReducer(createReducer(store.asyncReducers));
}
