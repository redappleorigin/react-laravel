import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

// Components
import Guest from './components/Guest'; // Shown only to users not logged in
import LoggedIn from './components/LoggedIn'; // Shown only to logged in users
import Header from './components/Header'; // Navigation Header

const Bar = ({auth, ...props}) => (
    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <Header />

            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                {/* Left Side Of Navbar */}
                <ul class="nav navbar-nav">
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>

                {/* Right Side Of Navbar */}
                {(() => {
                    if (!auth || auth.guest) {
                        return (
                            <Guest />
                        );
                    }

                    return (
                        <LoggedIn />
                    );
                })()}
            </div>
        </div>
    </nav>
);

export default connect((state) => state)(Bar);
