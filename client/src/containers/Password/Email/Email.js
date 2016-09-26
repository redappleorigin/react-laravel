import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import serialize from 'form-serialize';

import { Container } from '../../../components/Layout';
import Form from '../../../components/Form';
import { passwordResetEmail } from '../../../redux/Auth';

class Email extends Component {
    handleSubmit(event) {
        // Prevent the default form submission
        event.preventDefault();

        const { dispatch } = this.props;

        let fields = {};

        if (event && event.target) {
            fields = serialize(event.target, { hash: true });
        }

        dispatch(passwordResetEmail(fields));
    }

    render() {
        const props = this.props;

        const errors = {
            email: props.validation.email || (props.auth.passwordResetEmailError && props.auth.passwordResetEmailError.email),
        };

        const success = {
            status: props.session.status || props.auth.passwordResetEmailStatus,
        };

        return (
            <Container id="Password-Email">
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
                                    action="/password/email"
                                    onSubmit={ this.handleSubmit.bind(this) }
                                >
                                    <Form.Group hasError={ !!errors.email }>
                                        <label for="email" class="col-md-4 control-label">E-Mail Address</label>

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

                                    <Form.Group>
                                        <div class="col-md-6 col-md-offset-4">
                                            <button type="submit" class="btn btn-primary">
                                                <i class="fa fa-btn fa-envelope" /> Send Password Reset Link
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

Email.propTypes = {
    session: PropTypes.object.isRequired,
    validation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default connect((state) => state)(Email);
