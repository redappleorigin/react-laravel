if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
    return {
        path: 'login',
        getComponents (location, cb) {
            const Login = require('./Login').default;
            // const reducer = require('./reducer').default;
            // injectAsyncReducer(store, 'action', reducer);

            cb(null, Login);
        }
    }
}
