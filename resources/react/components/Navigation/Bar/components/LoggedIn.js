import React from 'react';
import { Link } from 'react-router';

const LoggedIn = (props) => (
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
                { props.user.name } <span class="caret" />
            </Link>

            <ul class="dropdown-menu" role="menu">
                <li>
                    <Link to="/logout">
                        <i class="fa fa-btn fa-sign-out" />Logout
                    </Link>
                </li>
            </ul>
        </li>
    </ul>
);

export default LoggedIn;
