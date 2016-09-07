import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as authActions from '../../../../redux/Auth';

const LoggedIn = ({auth, logout}) => (
    <ul class="nav navbar-nav navbar-right">
        {/* Authentication Links */}
        <li class="dropdown">
            <Link
                to="#"
                class="dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-expanded="false"
            >
                { auth.user.name } <span class="caret" />
            </Link>

            <ul class="dropdown-menu" role="menu">
                <li>
                    <Link to="/logout" onClick={ logout }>
                        <i class="fa fa-btn fa-sign-out" />Logout
                    </Link>
                </li>
            </ul>
        </li>
    </ul>
);

LoggedIn.propTypes = {
    auth: PropTypes.object.isRequired,
}

export default connect((state) => state, authActions)(LoggedIn);
