import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { Container } from '../../components/Layout';

class Dashboard extends Component {
    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props;

        // if the current props don't match the new props
        // and the new auth.guest is true
        // redirect to the login
        if (
            (this.props.auth.guest !== nextProps.auth.guest) &&
            nextProps.auth.guest
        ) {
            dispatch(push('/login'));
        }
    }

    render() {
        return (
            <Container id="Dashboard">
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <div class="panel panel-default">
                            <div class="panel-heading">Dashboard</div>

                            <div class="panel-body">
                                You are logged in!
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
}

export default connect((state) => state)(Dashboard);
