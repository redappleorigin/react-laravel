if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
    return {
        path: 'dashboard',
        getComponents (location, cb) {
            // require.ensure([
            //     './containers/PostPage',
            //     './reducer'
            // ], (require) => {
            //     let PostPage = require('./containers/PostPage').default
            //     let postReducer = require('./reducer').default
            //     injectAsyncReducer(store, 'currentPost', postReducer)
            //     cb(null, PostPage)
            // })

            // const Dashboard = require('./Dashboard').default;
            // const reducer = require('./reducer').default;
            // injectAsyncReducer(store, 'action', reducer);

            cb(null, Dashboard);
        }
    }
}
