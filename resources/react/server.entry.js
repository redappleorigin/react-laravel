import path from 'path';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { trigger } from 'redial';
import { StyleSheetServer } from 'aphrodite';
import { configureStore } from './common/store';
import helmet from 'react-helmet';
import reducer from './common/createReducer';
import createRoutes from './common/routes/root';

const req = global.req;

const store = configureStore({
    sourceRequest: {
        protocol: req.headers['x-forwarded-proto'] || req.protocol,
        host: req.headers.host
    }
});

const routes = createRoutes(store);
const history = createMemoryHistory(req.originalUrl);
const { dispatch } = store;

match({ routes, history}, (err, redirectLocation, renderProps) => {
    if (err) {
        console.error(err);
        return print('Internal server error');
    }

    if (!renderProps) {
        return print('Not found');
    }

    const { components } = renderProps;

    // Define locals to be provided to all lifecycle hooks:
    const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch
    };

    trigger('fetch', components, locals)
    .then(() => {
        const initialState = store.getState();
        const InitialView = (
            <Provider store={store}>
                <RouterContext {...renderProps} />
            </Provider>
        );

        // just call html = ReactDOM.renderToString(InitialView)
        // to if you don't want Aphrodite. Also change renderFullPage
        // accordingly
        const data = StyleSheetServer.renderStatic(
            () => ReactDOM.renderToString(InitialView)
        );
        const head = helmet.rewind();

        print(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            ${head.title.toString()}
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            ${head.meta.toString()}
            ${head.link.toString()}
            <style>
            html {
                box-sizing: border-box
            }

            *,
            *::before,
            *::after {
                box-sizing: border-box
            }

            html {
                font-size: 100%;
                -ms-overflow-style: scrollbar;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                height: 100%;
            }

            body {
                font-size: 1rem;
                background-color: #fff;
                color: #555;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                font-family: -apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif;
            }

            h1,h2,h3,h4,h5,h6 {
                margin: 0;
                padding: 0;
            }
            </style>
            <style data-aphrodite>${data.css.content}</style>
            </head>
            <body>
            <div id="root">${data.html}</div>
            <script>window.renderedClassNames = ${JSON.stringify(data.css.renderedClassNames)};</script>
            <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
            <script src="js/common.js"></script>
            <script async src="js/Client.js" ></script>
            </body>
            </html>
        `)
    }).catch(e => console.log(e));
});
