import React from 'react';
import { Link } from 'react-router';

const Header = () => (
    <div class="navbar-header">

        {/* Collapsed Hamburger */}
        <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#app-navbar-collapse"
        >
            <span class="sr-only">Toggle Navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>

        {/* Branding Image */}
        <Link class="navbar-brand" to="/">
            Laravel
        </Link>
    </div>
);

export default Header;
