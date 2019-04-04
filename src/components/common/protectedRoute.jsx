import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import authService from '../../services/authService'

class ProtectedRoute extends Component {
    render() {
        const {component: Component, render, ...args} = this.props;

        return (
            <Route
                {...args}
                render={(props) => authService.getCurrentUser()
                    ? Component ? <Component {...props}/> : render(props)
                    : <Redirect to="/login"/>
                }
            />
        );
    }
}

export default ProtectedRoute;