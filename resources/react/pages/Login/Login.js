import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Csrf from '../../components/Csrf';
import Form from '../../components/Form';

const Login = (props) => (
    <div id="Login" class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Login</div>

                    <div class="panel-body">
                        <form class="form-horizontal" role="form" method="POST" action="/login">
                            <Csrf.Field />

                            <div class={ 'form-group' + (props.validation.email ? ' has-error' : '') }>
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

                                    <Form.HelpBlock>{props.validation.email}</Form.HelpBlock>
                                </div>
                            </div>

                            <div class={ 'form-group' + (props.validation.password ? ' has-error' : '') }>
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

                                    <Form.HelpBlock>{props.validation.password}</Form.HelpBlock>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <div class="checkbox">
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="remember"
                                            /> Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default connect((state) => state)(Login);
