import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

const sourceRequest = (state = {
  host: '',
  protocol: '',
}, action) => state;

const auth = (state = {
    guest: true,
    user: {},
}, action) => state;

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer (asyncReducers) {
    const allReducers = [
        'csrf',
        'login',
        'session',
        'validation',
    ].reduce((carry, current) => {
        carry[current] = (state = {}, action) => state;

        return carry;
    }, {});

    return combineReducers({
        auth,
        routing,
        sourceRequest,
        ...allReducers,
        ...asyncReducers,
    });
}
