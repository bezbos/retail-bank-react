/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import authService from '../../services/authService';

/**
 * @description OAuth2 handler component.
 */
class OAuth2RedirectHandler extends Component {

    /**
     * Retrieves a specified URL parameter.
     * @param name - Name of the parameter
     * @returns {string}
     */
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        const results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {
        const jwtToken = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        if (jwtToken) {
            authService.oauthLogin(jwtToken);
            window.location = '/';
        }

        console.error(error);
        return <Redirect to="/login"/>
    }
}

export default OAuth2RedirectHandler;