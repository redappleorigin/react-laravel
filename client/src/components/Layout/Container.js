import React from 'react';

const Container = ({ children, ...container_props }) => (
    <div class="container" { ...container_props }>
        { children }
    </div>
);

export default Container;
