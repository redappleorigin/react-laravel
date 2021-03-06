import React from 'react';
import ReactDOM from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import { StyleSheetServer } from 'aphrodite';
import { configureStore } from './configureStore';
import preRenderMiddleware from './middleware/preRenderMiddleware';
import helmet from 'react-helmet';
import createRoutes from './createRoutes';
import Html from './Html';

const req = PHP.req;

const clientConfig = {
    auth: PHP.auth,
    csrf: PHP.csrf,
    session: PHP.session,
    validation: PHP.validation,
};

const location = req.originalUrl;
const history = createMemoryHistory(location);
const store = configureStore(clientConfig, history);
const routes = createRoutes(store);

match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
        console.error(err);
        return print('Internal server error');
    }

    if (redirectLocation) {
        return print(redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
        return print('Not found');
    }

    // This method waits for all render component
    // promises to resolve before returning to browser
    preRenderMiddleware(
        store.dispatch,
        renderProps.components,
        renderProps.params
    )
        .then(() => {
            const initialState = store.getState();

            console.log(initialState);

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

            const props = {
                head,
                initialState,
                ...data,
            };

            const markup = ReactDOM
                .renderToStaticMarkup(
                    <Html
                    {...props}
                    />
                )
            ;

            const html = [
                '<!DOCTYPE html>',
                markup,
            ].join("\n");

            print(html);
        })
    ;
});

// match({ routes, history }, (err, redirectLocation, renderProps) => {
//     if (err) {
//         console.error(err);
//         return print('Internal server error');
//     }
//
//     if (!renderProps) {
//         return print('Not found');
//     }
//
//     const { components } = renderProps;
//
//     // Define locals to be provided to all lifecycle hooks:
//     const locals = {
//         path: renderProps.location.pathname,
//         query: renderProps.location.query,
//         params: renderProps.params,
//
//         // Allow lifecycle hooks to dispatch Redux actions:
//         dispatch
//     };
//
//     trigger('fetch', components, locals)
//     .then(() => {
//         const initialState = store.getState();
//         const InitialView = (
//             <Provider store={store}>
//                 <RouterContext {...renderProps} />
//             </Provider>
//         );
//
//         // just call html = ReactDOM.renderToString(InitialView)
//         // to if you don't want Aphrodite. Also change renderFullPage
//         // accordingly
//         const data = StyleSheetServer.renderStatic(
//             () => ReactDOM.renderToString(InitialView)
//         );
//         const head = helmet.rewind();
//
//         const props = {
//             head,
//             initialState,
//             ...data,
//         };
//
//         const markup = ReactDOM
//             .renderToStaticMarkup(
//                 <Html
//                     {...props}
//                 />
//             )
//         ;
//
//         const html = [
//             '<!DOCTYPE html>',
//             markup,
//         ].join("\n");
//
//         print(html);
//
//         // print(`
//         //     <!DOCTYPE html>
//         //     <html lang="en">
//         //     <head>
//         //     <meta charSet="utf-8" />
//         //     <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
//         //     ${head.title.toString()}
//         //     <meta name="viewport" content="width=device-width, initial-scale=1" />
//         //     ${head.meta.toString()}
//         //     ${head.link.toString()}
//         //     <style>
//         //     html {
//         //         box-sizing: border-box
//         //     }
//         //
//         //     *,
//         //     *::before,
//         //     *::after {
//         //         box-sizing: border-box
//         //     }
//         //
//         //     html {
//         //         font-size: 100%;
//         //         -ms-overflow-style: scrollbar;
//         //         -webkit-tap-highlight-color: rgba(0,0,0,0);
//         //         height: 100%;
//         //     }
//         //
//         //     body {
//         //         font-size: 1rem;
//         //         background-color: #fff;
//         //         color: #555;
//         //         -webkit-font-smoothing: antialiased;
//         //         -moz-osx-font-smoothing: grayscale;
//         //         font-family: -apple-system,BlinkMacSystemFont,"Helvetica Neue",Helvetica,Arial,sans-serif;
//         //     }
//         //
//         //     h1,h2,h3,h4,h5,h6 {
//         //         margin: 0;
//         //         padding: 0;
//         //     }
//         //     </style>
//         //     <style data-aphrodite>${data.css.content}</style>
//         //     </head>
//         //     <body>
//         //     <div id="root">${data.html}</div>
//         //     <script>window.renderedClassNames = ${JSON.stringify(data.css.renderedClassNames)};</script>
//         //     <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
//         //     <script src="js/common.js"></script>
//         //     <script async src="js/Client.js" ></script>
//         //     </body>
//         //     </html>
//         // `)
//     }).catch(e => console.log(e));
// });
