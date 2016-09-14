import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { logout } from '../../../../redux/Auth';

class LoggedIn extends Component {
    handleLogout(event) {
        event.preventDefault();

        const { dispatch } = this.props;

        dispatch(logout());
    }

    render() {
        const { auth } = this.props;
        const username = (auth.user && auth.user.name) || null;

        return (
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
                        { username } <span class="caret" />
                    </Link>

                    <ul class="dropdown-menu" role="menu">
                        <li>
                            <Link to="/logout" onClick={ this.handleLogout.bind(this) }>
                                <i class="fa fa-btn fa-sign-out" />Logout
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        );
    }
}

LoggedIn.propTypes = {
    auth: PropTypes.object.isRequired,
}

export default connect((state) => state)(LoggedIn);
