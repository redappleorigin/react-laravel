import React from 'react';

const Label = ({ children, ...label_props }) => (
    <label { ...label_props }>
        { children }
    </label>
);

export default Label;
