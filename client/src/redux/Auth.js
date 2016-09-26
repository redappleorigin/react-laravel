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

const PASSWORD_RESET_EMAIL = 'Auth/PASSWORD_RESET_EMAIL';
const PASSWORD_RESET_EMAIL_FAILURE = PASSWORD_RESET_EMAIL + '_FAILURE';
const PASSWORD_RESET_EMAIL_REQUEST = PASSWORD_RESET_EMAIL + '_REQUEST';
const PASSWORD_RESET_EMAIL_SUCCESS = PASSWORD_RESET_EMAIL + '_SUCCESS';

const REGISTER = 'Auth/REGISTER';
const REGISTER_FAILURE = REGISTER + '_FAILURE';
const REGISTER_REQUEST = REGISTER + '_REQUEST';
const REGISTER_SUCCESS = REGISTER + '_SUCCESS';

const RESET_PASSWORD = 'Auth/RESET_PASSWORD';
const RESET_PASSWORD_FAILURE = RESET_PASSWORD + '_FAILURE';
const RESET_PASSWORD_REQUEST = RESET_PASSWORD + '_REQUEST';
const RESET_PASSWORD_SUCCESS = RESET_PASSWORD + '_SUCCESS';

// Starting Data
const initialState = {
    loaded: false,
    loading: false,
    loadError: null,

    loggingIn: false,
    loginError: null,

    loggingOut: false,
    logoutError: null,

    sendingPassordResetEmail: false,
    passwordResetEmailError: null,
    passwordResetEmailStatus: null,

    registeringUser: false,
    registerError: null,

    resettingPassword: false,
    resetPasswordError: null,
    resetPasswordStatus: null,

    guest: true,
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
            };
        }

        case LOAD_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: true,
                user: action.result,
            };
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
            };
        }

        case LOGIN_SUCCESS: {
            return {
                ...state,
                loggingIn: false,
                ...action.result,
            };
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
            };
        }

        case LOGOUT_SUCCESS: {
            return {
                ...state,
                loggingOut: false,
                ...action.result,
            };
        }

        // Password Reset Email Response
        case PASSWORD_RESET_EMAIL_REQUEST: {
            return {
                ...state,
                sendingPassordResetEmail: true,
                passwordResetEmailStatus: null,
            };
        }

        case PASSWORD_RESET_EMAIL_FAILURE: {
            return {
                ...state,
                sendingPassordResetEmail: false,
                passwordResetEmailError: action.error,
            };
        }

        case PASSWORD_RESET_EMAIL_SUCCESS: {
            return {
                ...state,
                sendingPassordResetEmail: false,
                passwordResetEmailError: null,
                passwordResetEmailStatus: action.result.status,
            };
        }

        // Register Response
        case REGISTER_REQUEST: {
            return {
                ...state,
                registeringUser: true,
            };
        }

        case REGISTER_FAILURE: {
            return {
                ...state,
                registeringUser: false,
                registerError: action.error,
            };
        }

        case REGISTER_SUCCESS: {
            return {
                ...state,
                registeringUser: false,
                registerError: null,
                ...action.result,
            };
        }

        // Reset Password Response
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resettingPassword: true,
                resetPasswordStatus: null,
            };
        }

        case RESET_PASSWORD_FAILURE: {
            return {
                ...state,
                resettingPassword: false,
                resetPasswordError: action.error,
            };
        }

        case RESET_PASSWORD_SUCCESS: {
            const { status, ...rest } = action.result;

            return {
                ...state,
                resettingPassword: false,
                resetPasswordError: null,
                resetPasswordStatus: status,
                ...rest,
            };
        }

        // Default Response
        default: {
            return state;
        }
    }
}

const serialize = (fields) => {
    const form = new FormData();

    for (const key in fields) {
        if (fields.hasOwnProperty(key)) {
            form.append(key, fields[key]);
        }
    }

    return form;
};

// Action Creators
export function load() {
    return {
        type: LOAD,
        promise: (client) => client.get('/loadAuth')
    }
}

export function login(fields) {
    const form = serialize(fields);

    return {
        type: LOGIN,
        promise: (client) => client('/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'accept': 'application/json',
            },
            body: form,
        }),
    };
}

export function logout() {
    return {
        type: LOGOUT,
        promise: (client) => client('/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'accept': 'application/json',
            },
        }),
    };
}

export function passwordResetEmail(fields) {
    const form = serialize(fields);

    return {
        type: PASSWORD_RESET_EMAIL,
        promise: (client) => client('/password/email', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'accept': 'application/json',
            },
            body: form,
        }),
    };
}

export function register(fields) {
    const form = serialize(fields);

    return {
        type: REGISTER,
        promise: (client) => client('/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'accept': 'application/json',
            },
            body: form,
        }),
    };
}

export function resetPassword(fields) {
    const form = serialize(fields);

    return {
        type: RESET_PASSWORD,
        promise: (client) => client('/password/reset', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'accept': 'application/json',
            },
            body: form,
        }),
    };
}
