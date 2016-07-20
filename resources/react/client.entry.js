import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';
import browserHistory from 'react-router/lib/browserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes';
import { configureStore } from './store';
import preRenderMiddleware from './middleware/preRenderMiddleware';

const initialState = window.INITIAL_STATE || {};
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store);

/**
 * Callback function handling frontend route changes.
 */
function onUpdate() {
    // Prevent duplicate fetches when first loaded.
    // Explanation: On server-side render, we already have __INITIAL_STATE__
    // So when the client side onUpdate kicks in, we do not need to fetch twice.
    // We set it to null so that every subsequent client-side navigation will
    // still trigger a fetch data.
    // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
    if (window.__INITIAL_STATE__ !== null) {
        window.__INITIAL_STATE__ = null;
        return;
    }

    const { components, params } = this.state;

    preRenderMiddleware(store.dispatch, components, params);
}

// Pull child routes using match. Adjust Router for vanilla webpack HMR,
// in development using a new key every time there is an edit.
match({ history, routes }, (error, redirectLocation, renderProps) => {
    // Render app with Redux and router context to container element.
    // We need to have a random in development because of `match`'s dependency on
    // `routes.` Normally, we would want just one file from which we require `routes` from.
    return render(
        <Provider store={store}>
            <Router { ...renderProps } onUpdate={onUpdate} />
        </Provider>,
        document.getElementById('root')
    );
});
