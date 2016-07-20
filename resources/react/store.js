import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promiseMiddleware from './middleware/promiseMiddleware';
import createReducer from './createReducer';
import createLogger from 'redux-logger';

export function configureStore (initialState, history) {
    const middleware = [
        thunk,
        promiseMiddleware,
        routerMiddleware(history),
    ];

    let store;

    if (__DEV__ && __CLIENT__) {
        middleware.push(createLogger());
        const reducer = createReducer();

        store = createStore(createReducer(), initialState, compose(
            applyMiddleware(...middleware),

            typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
        ));
    } else {
        store = createStore(createReducer(), initialState, compose(applyMiddleware(...middleware), f => f));
    }

    store.asyncReducers = {}

    if (__DEV__) {
        if (module.hot) {
            module.hot.accept('./createReducer', () => store.replaceReducer(require('./createReducer').default));
        }
    }

    return store;
}

export function injectAsyncReducer (store, name, asyncReducer) {
    store.asyncReducers[name] = asyncReducer;

    store.replaceReducer(createReducer(store.asyncReducers));
}
