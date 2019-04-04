/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import axios from 'axios';
import {toast} from 'react-toastify';

// Fallback that handles any error code responses by displaying a toast message.
axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError)
        toast.error('An unexpected error occurred.');

    return Promise.reject(error);
});

/**
 * We add the JWT to the header of all requests we send.
 */
export function setJwt(jwt) {
    if (jwt)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
}

/**
 * We use this service to send HTTP requests to the server.
 */
export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
}