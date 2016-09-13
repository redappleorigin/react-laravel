import React from 'react';

import { Csrf } from './';

/**
 * returns a form component
 * @param {[mixed]} children   react component(s)
 * @param {[mixed]} form_props any additional properties to add to the form
 * @return {Func}   returns a function that renders a form element
 */
const Form = ({ children, ...form_props }) => (
    <form { ...form_props }>
        <Csrf.Field />

        { children }
    </form>
);

export default Form;
