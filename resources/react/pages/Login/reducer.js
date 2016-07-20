// Actions
const LOAD = 'react/pages/Login/LOAD';
const LOAD_FAIL = 'react/pages/Login/LOAD_FAIL';
const LOAD_SUCCESS = 'react/pages/Login/LOAD_SUCCESS';

const LOGIN = 'react/pages/Login/LOGIN';
const LOGIN_FAIL = 'react/pages/Login/LOGIN_FAIL';
const LOGIN_SUCCESS = 'react/pages/Login/LOGIN_SUCCESS';

const LOGOUT = 'react/pages/Login/LOGOUT';
const LOGOUT_FAIL = 'react/pages/Login/LOGOUT_FAIL';
const LOGOUT_SUCCESS = 'react/pages/Login/LOGOUT_SUCCESS';

// Starting Data
const initialState = {
    loaded: false,
    loading: false,
    loadError: null,

    loggingIn: false,
    loginError: null,

    loggingOut: false,
    logoutError: null,

    user: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                loading: true,
            };
        }

        case LOAD_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
                loginError: action.error,
            }
        }

        case LOAD_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                user: action.result,
            }
        }

        case LOGIN: {
            return {
                ...state,
                loggingIn: true,
            };
        }

        case LOGIN_FAIL: {
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginError: action.error,
            }
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                loggingIn: false,
                user: action.result,
            }
        }

        case LOGOUT: {
            return {
                ...state,
                loggingOut: true,
            };
        }

        case LOGOUT_FAIL: {
            return {
                ...state,
                loggingOut: false,
                logoutError: action.error,
            }
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
                loggingOut: false,
                user: null,
            }
        }

        // do reducer stuff
        default: {
            return state;
        }
    }
}

// Action Creators
export function load() {
    return {
        types: [LOAD, LOAD_FAIL, LOAD_SUCCESS],
        promise: (client) => client.get('/loadAuth')
    }
}

export function login(name) {
    return {
        types: [LOGIN, LOGIN_FAIL, LOGIN_SUCCESS],
        promise: (client) => client.post('/auth/login', {
            data: {
                name,
            }
        }),
    };
}

export function logout() {
    return {
        types: [LOGOUT, LOGOUT_FAIL, LOGOUT_SUCCESS],
        promise: (client) => client.get('/auth/logout'),
    };
}
