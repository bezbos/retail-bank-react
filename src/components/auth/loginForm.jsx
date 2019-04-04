/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import Joi from 'joi-browser';
import React, {Component} from 'react';
import authService from '../../services/authService';
import exceptions from '../../utils/exceptions';
import Card from '../common/card';
import Input from '../common/input';
import SocialLogin from './socialLogin';

/**
 * @description Login form.
 */
class LoginForm extends Component {

    //region Properties
    state = {
        user: {email: '', password: ''},
        errors: {}
    };
    //endregion

    //region Validation
    schema = {
        email: Joi.string()
            .required()
            .label('Email'),
        password: Joi.string()
            .required()
            .label('Password')
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


        const {email, password} = this.state.user;
        await authService.login(email, password)
            .then(() => window.location = '/')
            .catch(ex => exceptions.showHttpException(ex));
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
                <Card title='Login form'>
                    <form onSubmit={this.handleSubmit}>
                        <SocialLogin/>
                        <br/>
                        <h5>Local sign in</h5>
                        <Input
                            label='Email'
                            value={user.email}
                            onChange={this.handleChange}
                            note='Please enter your email address.'
                            error={errors.email}
                        />
                        <Input
                            label='Password'
                            value={user.password}
                            onChange={this.handleChange}
                            note='Please enter your password.'
                            type='password'
                            error={errors.password}
                        />
                        <button type='submit' className='btn btn-primary'>Login</button>
                    </form>
                </Card>
            </React.Fragment>
        );
    }
}

export default LoginForm;