import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './redux/Auth';

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer (asyncReducers) {
    // These are blank reducers required for anything passed
    // in the initial state
    const intialReducers = [
        'csrf',
        'session',
        'validation',
    ].reduce((carry, current) => {
        carry[current] = (state = {}, action) => state;

        return carry;
    }, {});

    return combineReducers({
        auth,
        routing,
        ...intialReducers,
        ...asyncReducers,
    });
}
