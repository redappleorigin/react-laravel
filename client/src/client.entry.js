import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';

import { configureStore } from './configureStore';
import browserHistory from 'react-router/lib/browserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './createRoutes';

import preRenderMiddleware from './middleware/preRenderMiddleware';
import match from 'react-router/lib/match';
import Provider from './ClientProvider';

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

const rootEl = document.getElementById('root');

const renderApp = () => {
    // Pull child routes using match. Adjust Router for vanilla webpack HMR,
    // in development using a new key every time there is an edit.
    match({ history, routes }, (error, redirectLocation, renderProps) => {
        if (error) {
            // TODO: Error handling.
            console.log('==> 😭  React Router match failed.'); // eslint-disable-line no-console
        }

        // Render app with Redux and router context to container element.
        // We need to have a random in development because of `match`'s dependency on
        // `routes.` Normally, we would want just one file from which we require `routes` from.
        render(
            <AppContainer>
                <Provider
                    store={ store }
                    onUpdate={ onUpdate }
                    { ...renderProps }
                />
            </AppContainer>,
            rootEl
        );
    });
};

// The following is needed so that we can hot reload our App.
if (__DEV__ && module.hot) {
    // Accept changes to this file for hot reloading.
    module.hot.accept();

    // Any changes to our routes will cause a hotload re-render.
    module.hot.accept('./ClientProvider', renderApp);
}

renderApp();
