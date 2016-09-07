import App from './containers/App';

import { injectAsyncReducer } from './configureStore';

function errorLoading(err) {
    console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
    return (module) => cb(null, module.default);
}

export default function createRoutes (store) {
    const requireAuth = (nextState, replace, callback) => {
        const { auth: { guest }} = store.getState();

        if (guest) {
            replace({
                pathname: '/login',
                state: { nextPathname: nextState.location.pathname },
            });
        }

        callback();
    };

    const redirectAuth = (nextState, replace, callback) => {
        const { auth: { guest, user: { name } }} = store.getState();

        if (!guest && name) {
            replace({
                pathname: '/',
            });
        }

        callback();
    };

    const root = {
        path: '/',
        component: App,
        childRoutes: [
            {
                path: 'login',
                onEnter: redirectAuth,
                getComponent (location, cb) {
                    if (__SERVER__) {
                        const Login = require('./containers/Login/Login').default;
                        const reducer = require('./redux/Auth').default;
                        injectAsyncReducer(store, 'auth', reducer);

                        return cb(null, Login);
                    }

                    System
                        .import('./redux/Auth')
                        .then((module) => {
                            injectAsyncReducer(store, 'auth', module.default);

                            return loadRoute(cb);
                        })
                        .catch(errorLoading)
                    ;

                    System
                        .import('./containers/Login/Login')
                        .then(loadRoute(cb))
                        .catch(errorLoading)
                    ;
                }
            },
            {
                path: 'dashboard',
                onEnter: requireAuth,
                getComponent (location, cb) {
                    if (__SERVER__) {
                        const Dashboard = require('./containers/Dashboard/Dashboard').default;

                        return cb(null, Dashboard);
                    }

                    System
                        .import('./containers/Dashboard/Dashboard')
                        .then(loadRoute(cb))
                        .catch(errorLoading)
                    ;
                }
            },
            {
                path: 'register',
                getComponent (location, cb) {
                    if (__SERVER__) {
                        const Register = require('./containers/Register/Register').default;

                        return cb(null, Register);
                    }

                    System
                        .import('./containers/Register/Register')
                        .then(loadRoute(cb))
                        .catch(errorLoading)
                    ;
                }
            },
            {
                path: 'password/reset',
                getComponent (location, cb) {
                    if (__SERVER__) {
                        const Email = require('./containers/Password/Email/Email').default;

                        return cb(null, Email);
                    }

                    System
                        .import('./containers/Password/Email/Email')
                        .then(loadRoute(cb))
                        .catch(errorLoading)
                    ;
                }
            },
            {
                path: 'password/reset/:token',
                getComponent (location, cb) {
                    if (__SERVER__) {
                        const Reset = require('./containers/Password/Reset/Reset').default;

                        return cb(null, Reset);
                    }

                    System
                        .import('./containers/Password/Reset/Reset')
                        .then(loadRoute(cb))
                        .catch(errorLoading)
                    ;
                }
            },
        ],

        indexRoute: {
            getComponent(nextState, cb) {
                if (__SERVER__) {
                    const Home = require('./containers/Home/Home').default;

                    return cb(null, Home);
                }

                System
                    .import('./containers/Home/Home')
                    .then(loadRoute(cb))
                    .catch(errorLoading)
                ;
            }
        }
    };

    return root;
}
