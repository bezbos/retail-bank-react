/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import Joi from 'joi-browser';
import React, {Component} from 'react';
import {toast} from 'react-toastify';
import authService from '../../services/authService';
import exceptionsUtil from '../../utils/exceptions';
import Card from '../common/card';
import Input from '../common/input';

/**
 * @description Registration form.
 */
class RegistrationForm extends Component {

    //region Properties
    state = {
        user: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        errors: {}
    };
    //endregion

    //region Validation
    schema = {
        email: Joi.string()
            .email()
            .required()
            .label('Email'),
        password: Joi.string()
            .required()
            .label('Password'),
        confirmPassword: Joi.string()
            .required()
            .label('Confirm password')
    };

    /**
     * Checks if the form input fields are valid.
     * @returns {boolean}
     */
    isInvalid = () => {
        const {error} = Joi.validate(this.state.user, this.schema, {abortEarly: false});
        if (!error) {
            this.setState({errors: {}});
            return false;
        }

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;

        this.setState({errors});
        return true;
    };
    //endregion

    //region Event Handlers
    handleSubmit = async e => {
        e.preventDefault();
        if (this.isInvalid()) return;

        if (this.state.user.password === this.state.user.confirmPassword) {
            await authService.register(this.state.user)
                .then(() => toast.success('Successfully registered!'))
                .catch(ex => exceptionsUtil.showHttpException(ex, 'RegistrationForm.handleSubmit'));
        }
    };

    handleChange = ({currentTarget: input}) => {
        const user = {...this.state.user};
        user[input.name] = input.value;

        this.setState({user});
    };

    //endregion

    render() {
        const {user, errors} = this.state;

        return (
            <React.Fragment>
                <Card title="Registration form">
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            label="Email"
                            value={user.email}
                            onChange={this.handleChange}
                            note="Please enter your email address."
                            error={errors.email}
                        />
                        <Input
                            label="Password"
                            value={user.password}
                            onChange={this.handleChange}
                            note="Please enter your password."
                            type="password"
                            error={errors.password}
                        />
                        <Input
                            label="Confirm Password"
                            value={user.confirmPassword}
                            onChange={this.handleChange}
                            note="Please enter your password again to confirm."
                            placeholder="Confirm password..."
                            type="password"
                            error={errors.confirmPassword}
                        />
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </Card>
            </React.Fragment>
        );
    }
}

export default RegistrationForm;