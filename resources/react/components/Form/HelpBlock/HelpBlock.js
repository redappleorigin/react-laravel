import React from 'react';

const HelpBlock = ({children}) => {
    if (!children) {
        return null;
    }

    return (
        <span class="help-block">
            <strong>{children}</strong>
        </span>
    );
};

export default HelpBlock;
