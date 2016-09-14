import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import { Container } from '../../components/Layout';
import Form from '../../components/Form';

const Register = (props) => (
    <Container id="Register">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Register</div>

                    <div class="panel-body">
                        <form class="form-horizontal" role="form" method="POST" action="/register">
                            <Form.Csrf.Field />

                            <div class={ 'form-group' + (props.validation.name ? ' has-error' : '') }>
                                <label for="name" class="col-md-4 control-label">Name</label>

                                <div class="col-md-6">
                                    <input
                                        id="name"
                                        type="text"
                                        class="form-control"
                                        name="name"
                                        defaultValue={ props.session.old.name || '' }
                                    />

                                    <Form.HelpBlock>{props.validation.name}</Form.HelpBlock>
                                </div>
                            </div>

                            <div class={ 'form-group' + (props.validation.email ? ' has-error' : '') }>
                                <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input
                                        id="email"
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        defaultValue={ props.session.old.email || '' }
                                    />

                                    <Form.HelpBlock>{props.validation.email}</Form.HelpBlock>
                                </div>
                            </div>

                            <div class={ 'form-group' + (props.validation.password ? ' has-error' : '') }>
                                <label for="password" class="col-md-4 control-label">Password</label>

                                <div class="col-md-6">
                                    <input
                                        id="password"
                                        type="password"
                                        class="form-control"
                                        name="password"
                                    />

                                    <Form.HelpBlock>{props.validation.password}</Form.HelpBlock>
                                </div>
                            </div>

                            <div class={ 'form-group' + (props.validation.password_confirmation ? ' has-error' : '') }>
                                <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

                                <div class="col-md-6">
                                    <input
                                        id="password-confirm"
                                        type="password"
                                        class="form-control"
                                        name="password_confirmation"
                                    />

                                    <Form.HelpBlock>{props.validation.password_confirmation}</Form.HelpBlock>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fa fa-btn fa-user" /> Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Container>
);

Register.propTypes = {
    session: PropTypes.object.isRequired,
    validation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default connect((state) => state)(Register);
