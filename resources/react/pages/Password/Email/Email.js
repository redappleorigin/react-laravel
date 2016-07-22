import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import Csrf from '../../../components/Csrf';
import Form from '../../../components/Form';

const Email = (props) => (
    <div id="Password-Email" class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Reset Password</div>

                    <div class="panel-body">
                        <Form.AlertSuccess>{props.session.status}</Form.AlertSuccess>

                        <form class="form-horizontal" role="form" method="POST" action="/password/email">
                            <Csrf.Field />

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

                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fa fa-btn fa-envelope" /> Send Password Reset Link
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

Email.propTypes = {
    session: PropTypes.object.isRequired,
    validation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export default connect((state) => state)(Email);
