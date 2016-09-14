import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import { push } from 'react-router-redux';

import { Container } from '../../components/Layout';
import Form from '../../components/Form';
import { login } from '../../redux/Auth';

// This is the login page
class Login extends Component {
    componentWillReceiveProps(nextProps) {
        const { dispatch } = this.props;

        // if the current props don't match the new props
        // and the new auth.guest is false
        // redirect to the dashboard
        if (
            (this.props.auth.guest !== nextProps.auth.guest) &&
            !nextProps.auth.guest
        ) {
            dispatch(push('/dashboard'));
        }
    }

    handleSubmit(event) {
        // Prevent the default form submission
        event.preventDefault();

        const { dispatch } = this.props;

        let fields = {};

        if (event && event.target) {
            fields = serialize(event.target, { hash: true });
        }

        dispatch(login(fields));
    }

    render() {
        const props = this.props;

        const errors = {
            email: props.validation.email || (props.auth.loginError && props.auth.loginError.email),
            password: props.validation.password || (props.auth.loginError && props.auth.loginError.password),
        };

        return (
            <Container id="Login">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <div class="panel panel-default">
                            <div class="panel-heading">Login</div>

                            <div class="panel-body">
                                <Form
                                    class="form-horizontal"
                                    role="form"
                                    method="POST"
                                    action="/login"
                                    onSubmit={ this.handleSubmit.bind(this) }
                                >
                                    <Form.Group hasError={ !!errors.email }>
                                        <label
                                            for="email"
                                            class="col-md-4 control-label"
                                        >
                                            E-Mail Address
                                        </label>

                                        <div class="col-md-6">
                                            <input
                                                id="email"
                                                type="email"
                                                class="form-control"
                                                name="email"
                                                defaultValue={ props.session.old.email || '' }
                                            />

                                            <Form.HelpBlock>{ errors.email }</Form.HelpBlock>
                                        </div>
                                    </Form.Group>

                                    <Form.Group hasError={ !!errors.password }>
                                        <label
                                            for="password"
                                            class="col-md-4 control-label"
                                        >
                                            Password
                                        </label>

                                        <div class="col-md-6">
                                            <input
                                                id="password"
                                                type="password"
                                                class="form-control"
                                                name="password"
                                            />

                                            <Form.HelpBlock>{ errors.password }</Form.HelpBlock>
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                        <div class="col-md-6 col-md-offset-4">
                                            <Form.CheckBox
                                                label={{
                                                    value: 'Remember Me'
                                                }}
                                                name="remember"
                                            />
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                        <div class="col-md-6 col-md-offset-4">
                                            <button
                                                type="submit"
                                                class="btn btn-primary"
                                            >
                                                <i class="fa fa-btn fa-sign-in" /> Login
                                            </button>

                                            <Link
                                                class="btn btn-link"
                                                to="/password/reset"
                                            >
                                                Forgot Your Password?
                                            </Link>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }
}

Login.propTypes = {
    session: PropTypes.object.isRequired,
    validation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default connect((state) => state)(Login);
