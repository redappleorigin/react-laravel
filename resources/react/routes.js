// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from './App';
import Pages from './pages';
import Home from './pages/Home';

export default function createRoutes (store) {
    const root = {
        path: '/',
        component: App,
        getChildRoutes (location, cb) {
            require.ensure([], (require) => {
                cb(null, [
                    require('./pages/Login').default(store),
                    // require('./pages/Dashboard').default(store),
                ]);
            });
        },

        indexRoute: {
            component: Home
        }
    };

    return root;
}
