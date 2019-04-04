/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import {faDoorOpen} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {Component} from 'react';

const API_BASE_URL = 'http://localhost:8080';
const OAUTH2_REDIRECT_URI = process.env['NODE_ENV'] === 'development'
    ? 'http://localhost:3000/oauth2/redirect'
    : 'http://localhost:5000/oauth2/redirect';
const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;

class SocialLogin extends Component {

    render() {
        return (
            <div>
                <h5>External provider:</h5>
                <a className="btn btn-outline-dark" href={GOOGLE_AUTH_URL}>
                    <FontAwesomeIcon icon={faDoorOpen}/> Google Sign In
                </a>
            </div>
        );
    }
}

export default SocialLogin;