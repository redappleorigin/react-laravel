/*
* Redux middleware to handle promises
* As seen in: https://github.com/caljrimmer/isomorphic-redux-app
*/

export default function promiseMiddleware() {
    return next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        const { promise, type, ...rest } = action; // eslint-disable-line no-redeclare
        if (!promise) {
            return next(action);
        }

        const REQUEST = type + '_REQUEST';
        const SUCCESS = type + '_SUCCESS';
        const FAILURE = type + '_FAILURE';

        next({...rest, type: REQUEST});

        const actionPromise = promise(fetch);

        actionPromise.then(
            (response) => {
                if (response.status >= 300) {
                    const error = new Error(response.statusText);
                    error.response = response;

                    throw error;
                }

                next({
                    ...rest,
                    result: response.text(),
                    type: SUCCESS
                });
            }
        ).catch((error)=> {
            console.error('MIDDLEWARE ERROR:', error);

            next({
                ...rest,
                error,
                type: FAILURE
            });
        });

        return actionPromise;
    };
}
