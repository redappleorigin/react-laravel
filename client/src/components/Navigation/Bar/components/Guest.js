import React from 'react';
import { Link } from 'react-router';

const Guest = () => (
    <ul class="nav navbar-nav navbar-right">
        {/* Authentication Links */}
        <li>
            <Link to="/login">Login</Link>
        </li>

        <li>
            <Link to="/register">Register</Link>
        </li>
    </ul>
);

export default Guest;
