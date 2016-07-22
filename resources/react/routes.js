import App from './App';

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
                state: { nextPathname: nextState.location.pathname }
            });
        }

        callback();
    };

    const redirectAuth = (nextState, replace, callback) => {
        const { auth: { guest, user: { name } }} = store.getState();

        if (!guest && name) {
            replace({
                pathname: '/'
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
                        const Login = require('./pages/Login/Login').default;
                        const reducer = require('./pages/Login/reducer').default;
                        injectAsyncReducer(store, 'login', reducer);

                        return cb(null, Login);
                    }

                    const reducer = System
                        .import('./pages/Login/reducer')
                        .then((module) => {
                            injectAsyncReducer(store, 'login', module.default);

                            return loadRoute(cb);
                        })
                        .catch(errorLoading)
                    ;

                    const Login = System
                        .import('./pages/Login/Login')
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
                        const Dashboard = require('./pages/Dashboard/Dashboard').default;

                        return cb(null, Dashboard);
                    }

                    const Dashboard = System
                        .import('./pages/Dashboard/Dashboard')
                        .then(loadRoute(cb))
                        .catch(errorLoading)
                    ;
                }
            },
            {
                path: 'register',
                getComponent (location, cb) {
                    if (__SERVER__) {
                        const Register = require('./pages/Register/Register').default;

                        return cb(null, Register);
                    }

                    const Register = System
                        .import('./pages/Register/Register')
                        .then(loadRoute(cb))
                        .catch(errorLoading)
                    ;
                }
            },
            {
                path: 'password/reset',
                getComponent (location, cb) {
                    if (__SERVER__) {
                        const Email = require('./pages/Password/Email/Email').default;

                        return cb(null, Email);
                    }

                    const Email = System
                        .import('./pages/Password/Email/Email')
                        .then(loadRoute(cb))
                        .catch(errorLoading)
                    ;
                }
            },
            {
                path: 'password/reset/:token',
                getComponent (location, cb) {
                    if (__SERVER__) {
                        const Reset = require('./pages/Password/Reset/Reset').default;

                        return cb(null, Reset);
                    }

                    const Reset = System
                        .import('./pages/Password/Reset/Reset')
                        .then(loadRoute(cb))
                        .catch(errorLoading)
                    ;
                }
            },
        ],

        indexRoute: {
            getComponent(nextState, cb) {
                if (__SERVER__) {
                    const Home = require('./pages/Home/Home').default;

                    return cb(null, Home);
                }

                System
                    .import('./pages/Home/Home')
                    .then(loadRoute(cb))
                    .catch(errorLoading)
                ;
            }
        }
    };

    return root;
}
