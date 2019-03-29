/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import React, {Component} from 'react';
import {toast} from "react-toastify";
import authService from "../../services/authService";
import exceptionsUtil from "../../utils/exceptions";
import Card from "../common/card";
import Input from "../common/input";

class RegistrationForm extends Component {

    state = {
        user: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    };

    handleSubmit = async e => {
        e.preventDefault();

        if (this.state.user.password === this.state.user.confirmPassword) {
            await authService.register(this.state.user)
                .then(() => toast.success("Successfully registered!"))
                .catch(ex => exceptionsUtil.showHttpException(ex, "RegistrationForm.handleSubmit"));
        }
    };

    handleChange = ({currentTarget: input}) => {
        const user = {...this.state.user};
        user[input.name] = input.value;

        if (input.name === "confirmPassword" && (user.password !== user.confirmPassword)) {
            // TODO
        }

        this.setState({user});
    };

    render() {
        return (
            <React.Fragment>
                <Card title="Registration form">
                    <form onSubmit={this.handleSubmit}>
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
                        <Input
                            label="Confirm Password"
                            value={this.state.user.confirmPassword}
                            onChange={this.handleChange}
                            note="Please enter your password again to confirm."
                            placeholder="Confirm password..."
                            type="password"
                        />
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </Card>
            </React.Fragment>
        );
    }
}

export default RegistrationForm;