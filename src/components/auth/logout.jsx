/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import {Component} from 'react';
import authService from '../../services/authService';

/**
 * @description Handles the user logout;
 */
class Logout extends Component {

    componentDidMount() {
        authService.logout();
        window.location = '/';
    }

    render() {
        return null;
    }
}

export default Logout;