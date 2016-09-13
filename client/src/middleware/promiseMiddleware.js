/*
* Redux middleware to handle promises
* As seen in: https://github.com/caljrimmer/isomorphic-redux-app
*/

export default function promiseMiddleware() {
    return next => action => {
        // If the action is a thunk
        // Resolve it, then return the value
        if (typeof action === 'function') {
            // eslint-disable-next-line
            return action(dispatch, getState);
        }

        const { promise, type, ...rest } = action; // eslint-disable-line no-redeclare

        // If the current action is not a promise
        // return the action as is
        if (!promise) {
            return next(action);
        }

        const REQUEST = type + '_REQUEST';
        const SUCCESS = type + '_SUCCESS';
        const FAILURE = type + '_FAILURE';

        // This dispatches the request action
        // then continues on
        next({...rest, type: REQUEST});

        // call the promise of the action and pass in whatever we need,
        // I just needed to make ajax/http requests so I passed in isomorphic-fetch
        const actionPromise = promise(fetch);

        // Once the Initial Request is complete,
        // get the response and handle the success or failure
        actionPromise
            .then(
                (response) => {
                    const body = response.json();

                    // Treat anything over a 200 as an error.
                    if (response.status >= 300) {
                        const error = new Error(response.statusText);
                        error.response = body;

                        // Throw the error and catch it later
                        throw error;
                    }

                    body
                        .then((result) => next({
                            ...rest,
                            result,
                            type: SUCCESS
                        }))
                    ;
                }
            )
            .catch((error)=> {
                return error
                    .response
                    .then((response) => {
                        console.error('MIDDLEWARE ERROR:', error);
                
                        next({
                            ...rest,
                            error: response,
                            type: FAILURE
                        });
                    })
                ;
            })
        ;

        return actionPromise;
    };
}
