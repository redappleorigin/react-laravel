import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const Field = ({csrf}) => (
    <input type="hidden" name="_token" value={ csrf.token } />
);

Field.propTypes = {
    csrf: PropTypes.object.isRequired,
};

export default connect((state) => (state))(Field);
