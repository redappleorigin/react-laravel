import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import serialize from 'form-serialize';
import { push } from 'react-router-redux';

import Form from '../../components/Form';
import { login } from '../../redux/Auth';

const Login = (props) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const { dispatch } = props;

        let fields = {};

        if (event && event.target) {
            fields = serialize(event.target, { hash: true });
        }

        dispatch(login(fields));

        // dispatch(login(fields))
        //     .then(({ ok }) => {
        //         if (ok) {
        //             dispatch(push('/dashboard'));
        //         }
        //     })
        // ;

        // login(fields)
        //     .then(({ ok }) => {
        //         if (ok) {
        //             console.log(props);
        //             push('/login');
        //         }
        //     })
        // ;
    };

    const errors = {
        email: props.validation.email || (props.auth.loginError && props.auth.loginError.email),
        password: props.validation.password || (props.auth.loginError && props.auth.loginError.password),
    };

    console.log(props.auth);

    return (
        <div id="Login" class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">Login</div>

                        <div class="panel-body">
                            <form class="form-horizontal" role="form" method="POST" action="/login" onSubmit={ handleSubmit }>
                                <Form.Csrf.Field />

                                <div class={ 'form-group' + (errors.email ? ' has-error' : '') }>
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
                                </div>

                                <div class={ 'form-group' + (errors.password ? ' has-error' : '') }>
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
    )
};

Login.propTypes = {
    session: PropTypes.object.isRequired,
    validation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default connect((state) => state)(Login);
