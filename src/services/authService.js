/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import jwtDecode from 'jwt-decode';
import {apiUrl} from '../config.json';
import http from './httpService';

const apiEndpoint = apiUrl + '/auth';
const tokenKey = 'token';

http.setJwt(getJwt());

/**
 * Sends user information to the API endpoint and expects to receive back a JWT token.
 * If successful we store the token in local storage and use it for authorization and authentication.
 * @param usernameOrEmail - User email.
 * @param password - User password
 * @returns {Promise<void>}
 */
export async function login(usernameOrEmail, password) {
    const {data} = await http.post(apiEndpoint + '/signin', {usernameOrEmail, password});
    localStorage.setItem(tokenKey, data.accessToken);
}

/**
 * We call this function from our <code>OAuth2RedirectHandler</code> component which is responsible for retrieving the JWT token.
 * @param accessToken - Token from the query string.
 */
export function oauthLogin(accessToken) {
    localStorage.setItem(tokenKey, accessToken);
}

/**
 * Sends a request to an API endpoint to register a new user account.
 * @param user - User object containing email and password.
 * @returns {*}
 */
export function register(user) {
    return http.post(apiEndpoint + '/signup', {email: user.email, password: user.password});
}

/**
 * Removes the JWT from local storage.
 * We recommend using <code>window.location="/"</code> after this function to reload the window.
 */
export function logout() {
    localStorage.removeItem(tokenKey);
}

/**
 * Retrieves the decoded JWT from local storage.
 * @returns {Object | null}
 */
export function getCurrentUser() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
    } catch (ex) {
        return null;
    }
}

/**
 * Retrieves the decoded JWT from local storage and checks if it contains the admin role.
 * @returns {boolean | null}
 */
export function currentUserIsAdmin() {
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt).roles.includes('ROLE_ADMIN');
    } catch (ex) {
        return null;
    }
}

/**
 * Returns the raw JWT string.
 * @returns {string}
 */
export function getJwt() {
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    oauthLogin,
    register,
    logout,
    getCurrentUser,
    currentUserIsAdmin,
    getJwt
}