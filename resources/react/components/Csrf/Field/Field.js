import React from 'react';
import { connect } from 'react-redux';

const Field = ({csrf}) => (
    <input type="hidden" name="_token" value={ csrf.token } />
);

export default connect((state) => (state))(Field);
