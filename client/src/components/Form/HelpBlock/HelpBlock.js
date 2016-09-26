import React, { PropTypes } from 'react';

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

HelpBlock.propTypes = {
    children: PropTypes.node,
};

export default HelpBlock;
