import React from 'react';

/**
 * Returns a string of the final class name
 * @param  {String}  className additional className string to append
 * @param  {Boolean} hasError  whether to append has-error to className
 * @return {String}            the created className
 */
const getClassName = (className, hasError = false) => {
    let name = 'form-group';

    if (className) {
        name += ` ${className}`;
    }

    if (hasError) {
        name += ' has-error';
    }

    return name;
};

/**
 * Convenience UI-component to return a div with a className of form-group
 * @param {[mixed]} children    react child component
 * @param {String}  className   any additional class names you wish to add
 * @param {Boolean} hasError    adds has-error to className
 * @param {[mixed]} group_props any additional properties to add to the div
 */
const Group = ({ children, className, hasError, ...group_props }) => (
    <div class={ getClassName(className, hasError) } { ...group_props }>
        { children }
    </div>
);

export default Group;
