import React from 'react';

import { connect } from 'react-redux';

import Csrf from '../../../components/Csrf';
import Form from '../../../components/Form';

const Reset = (props) => (
    <div id="Password-Reset" class="container">
    {console.log(props)}
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Reset Password</div>

                    <div class="panel-body">
                        <form class="form-horizontal" role="form" method="POST" action="/password/reset">
                            <Csrf.Field />

                            <input
                                type="hidden"
                                name="token"
                                value={ props.routeParams.token }
                            />

                            <div class={ 'form-group' + (props.validation.email ? ' has-error' : '') }>
                                <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input
                                        id="email"
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        defaultValue={ props.email || props.session.old.email || '' }
                                    />

                                    <Form.HelpBlock>{props.validation.email}</Form.HelpBlock>
                                </div>
                            </div>

                            <div class={ 'form-group' + (props.validation.password ? ' has-error' : '') } >
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
                                        <i class="fa fa-btn fa-refresh" /> Reset Password
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default connect((state) => state)(Reset);
