// Actions
const LOAD = 'Auth/LOAD';
const LOAD_FAILURE = LOAD + '_FAILURE';
const LOAD_REQUEST = LOAD + '_REQUEST';
const LOAD_SUCCESS = LOAD + '_SUCCESS';

const LOGIN = 'Auth/LOGIN';
const LOGIN_FAILURE = LOGIN + '_FAILURE';
const LOGIN_REQUEST = LOGIN + '_REQUEST';
const LOGIN_SUCCESS = LOGIN + '_SUCCESS';

const LOGOUT = 'Auth/LOGOUT';
const LOGOUT_FAILURE = LOGOUT + '_FAILURE';
const LOGOUT_REQUEST = LOGOUT + '_REQUEST';
const LOGOUT_SUCCESS = LOGOUT + '_SUCCESS';

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
        // Initial Request to Load the component
        case LOAD_REQUEST: {
            return {
                ...state,
                loading: true,
            };
        }

        case LOAD_FAILURE: {
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

        // Login Response
        case LOGIN_REQUEST: {
            return {
                ...state,
                loggingIn: true,
            };
        }

        case LOGIN_FAILURE: {
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

        // Logout Response
        case LOGOUT_REQUEST: {
            return {
                ...state,
                loggingOut: true,
            };
        }

        case LOGOUT_FAILURE: {
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

        // Default Response
        default: {
            return state;
        }
    }
}

// Action Creators
export function load() {
    return {
        type: LOAD,
        promise: (client) => client.get('/loadAuth')
    }
}

export function login(name) {
    return {
        type: LOGIN,
        promise: (client) => client.post('/auth/login', {
            data: {
                name,
            }
        }),
    };
}

export function logout() {
    return {
        type: LOGOUT,
        promise: (client) => client.get('/logout'),
    };
}
