import React, { PropTypes } from 'react';

const AlertSuccess = ({children}) => {
    if (!children) {
        return null;
    }

    return (
        <div class="alert alert-success">
            {children}
        </div>
    );
};

AlertSuccess.propTypes = {
    children: PropTypes.array,
};

export default AlertSuccess;
