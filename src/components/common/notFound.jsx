/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

import React, {Component} from 'react';
import sadPepe from '../../images/sad-pepe-404.png';

/**
 * @description Slightly humorous(maybe triggering to some people) component that is used for non-existing routes.
 */
class NotFound extends Component {
    render() {
        return (
            <div className="center fade-in">
                <h1>404 - Page not found...</h1>
                <img src={sadPepe} alt="sad-pepe-404" style={{marginTop: '25px'}} width="250px" height="250px"/>
            </div>
        );
    }
}

export default NotFound;