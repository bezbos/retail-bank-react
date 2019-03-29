import React, {Component} from 'react';

const API_BASE_URL = 'http://localhost:8080';
const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect';
const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;

class SocialLogin extends Component {

    render() {
        return (
            <div>
                <a className="btn btn-outline-dark btn-block" href={GOOGLE_AUTH_URL}>
                    Log in with Google
                </a>
                <a className="btn btn-outline-dark btn-block" href={FACEBOOK_AUTH_URL}>
                    Log in with Facebook
                </a>
            </div>
        );
    }
}

export default SocialLogin;