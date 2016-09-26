import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import { push } from 'react-router-redux';

import { Container } from '../../../components/Layout';
import Form from '../../../components/Form';
import { resetPassword } from '../../../redux/Auth';

/**
 * The Password Reset Page
 *
 * This page is shown after the password email has been sent
 */
class Reset extends Component {
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

        dispatch(resetPassword(fields));
    }

    render() {
        const props = this.props;

        const errors = {
            email: props.validation.email || (props.auth.resetPasswordError && props.auth.resetPasswordError.email),
            password: props.validation.password || (props.auth.resetPasswordError && props.auth.resetPasswordError.password),
            password_confirmation: props.validation.password_confirmation || (props.auth.resetPasswordError && props.auth.resetPasswordError.password_confirmation),
        };

        const success = {
            status: props.session.status || props.auth.resetPasswordStatus,
        };

        return (
            <Container id="Password-Reset">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <div class="panel panel-default">
                            <div class="panel-heading">Reset Password</div>

                            <div class="panel-body">
                                <Form.AlertSuccess>{ success.status }</Form.AlertSuccess>

                                <Form
                                    class="form-horizontal"
                                    role="form"
                                    method="POST"
                                    action="/password/reset"
                                    onSubmit={ this.handleSubmit.bind(this) }
                                >
                                    {/* This is the token generated by laravel to confirm that this user is allowed to change this password */}
                                    <input
                                        type="hidden"
                                        name="token"
                                        value={ props.routeParams.token }
                                    />

                                    <Form.Group hasError={ !!errors.email }>
                                        <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                                        <div class="col-md-6">
                                            <input
                                                id="email"
                                                type="email"
                                                class="form-control"
                                                name="email"
                                                defaultValue={ props.email || props.session.old.email || '' }
                                            />

                                            <Form.HelpBlock>{ errors.email }</Form.HelpBlock>
                                        </div>
                                    </Form.Group>

                                    <Form.Group hasError={ !!errors.password } >
                                        <label for="password" class="col-md-4 control-label">Password</label>

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

                                    <Form.Group hasError={ !!errors.password_confirmation }>
                                        <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>
                                        <div class="col-md-6">
                                            <input
                                                id="password-confirm"
                                                type="password"
                                                class="form-control"
                                                name="password_confirmation"
                                            />

                                            <Form.HelpBlock>{ errors.password_confirmation }</Form.HelpBlock>
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                        <div class="col-md-6 col-md-offset-4">
                                            <button type="submit" class="btn btn-primary">
                                                <i class="fa fa-btn fa-refresh" /> Reset Password
                                            </button>
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

Reset.propTypes = {
    session: PropTypes.object.isRequired,
    validation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default connect((state) => state)(Reset);
