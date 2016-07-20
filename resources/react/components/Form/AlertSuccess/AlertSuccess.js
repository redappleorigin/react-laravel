import React from 'react';

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

export default AlertSuccess;
