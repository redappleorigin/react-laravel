import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router/lib/Router';

const ClientProvider = ({store, ...renderProps}) => (
    <Provider store={store}>
        <Router { ...renderProps } />
    </Provider>
);

export default ClientProvider;
