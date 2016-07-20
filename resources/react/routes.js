import App from './App';

import { injectAsyncReducer } from './store';

function errorLoading(err) {
    console.error('Dynamic page loading failed', err);
}

function loadRoute(cb) {
    return (module) => cb(null, module.default);
}

export default function createRoutes (store) {
    const root = {
        path: '/',
        component: App,
        childRoutes: [
            {
                path: 'login',
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
                getComponent (location, cb) {
                    if (__SERVER__) {
                        const Dashboard = require('./pages/Dashboard/Dashboard').default;
                        // const reducer = require('./pages/Dashboard/reducer').default;
                        // injectAsyncReducer(store, 'dashboard', reducer);

                        return cb(null, Dashboard);
                    }

                    // const reducer = System
                    //     .import('./pages/Dashboard/reducer')
                    //     .then((module) => {
                    //         injectAsyncReducer(store, 'dashboard', module.default);
                    //
                    //         return loadRoute(cb);
                    //     })
                    //     .catch(errorLoading)
                    // ;

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
                        // const reducer = require('./pages/Register/reducer').default;
                        // injectAsyncReducer(store, 'register', reducer);

                        return cb(null, Register);
                    }

                    // const reducer = System
                    //     .import('./pages/Register/reducer')
                    //     .then((module) => {
                    //         injectAsyncReducer(store, 'register', module.default);
                    //
                    //         return loadRoute(cb);
                    //     })
                    //     .catch(errorLoading)
                    // ;

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
                        // const reducer = require('./pages/Password/Email/reducer').default;
                        // injectAsyncReducer(store, 'email', reducer);

                        return cb(null, Email);
                    }

                    // const reducer = System
                    //     .import('./pages/Password/Email/reducer')
                    //     .then((module) => {
                    //         injectAsyncReducer(store, 'email', module.default);
                    //
                    //         return loadRoute(cb);
                    //     })
                    //     .catch(errorLoading)
                    // ;

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
                        // const reducer = require('./pages/Password/Reset/reducer').default;
                        // injectAsyncReducer(store, 'reset', reducer);

                        return cb(null, Reset);
                    }

                    // const reducer = System
                    //     .import('./pages/Password/Reset/reducer')
                    //     .then((module) => {
                    //         injectAsyncReducer(store, 'reset', module.default);
                    //
                    //         return loadRoute(cb);
                    //     })
                    //     .catch(errorLoading)
                    // ;

                    const Reset = System
                        .import('./pages/Password/Reset/Reset')
                        .then(loadRoute(cb))
                        .catch(errorLoading)
                    ;
                }
            },
        ],

        indexRoute: {
            component: require('./pages/Home/Home').default,
        }
    };

    return root;
}
