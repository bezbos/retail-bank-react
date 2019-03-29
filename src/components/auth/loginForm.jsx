/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import React, {Component} from 'react';
import authService from "../../services/authService";
import exceptions from "../../utils/exceptions";
import Card from "../common/card";
import Input from "../common/input";
import SocialLogin from "./socialLogin";

class LoginForm extends Component {
    state = {
        user: {
            email: "",
            password: ""
        }
    };

    handleSubmit = async e => {
        e.preventDefault();
        const {email, password} = this.state.user;

        await authService.login(email, password)
            .then(() => window.location = "/")
            .catch(ex => exceptions.showHttpException(ex));

    };

    handleChange = ({currentTarget: input}) => {
        const user = {...this.state.user};
        user[input.name] = input.value;

        this.setState({user});
    };

    render() {
        return (
            <React.Fragment>
                <Card title="Login form">
                    <form onSubmit={this.handleSubmit}>
                        <SocialLogin />
                        <Input
                            label="Email"
                            value={this.state.user.email}
                            onChange={this.handleChange}
                            note="Please enter your email address."
                        />
                        <Input
                            label="Password"
                            value={this.state.user.password}
                            onChange={this.handleChange}
                            note="Please enter your password."
                            type="password"
                        />
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </Card>
            </React.Fragment>
        );
    }
}

export default LoginForm;