/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

import React, {Component} from 'react';

/**
 * @description A component using Bootstrap 4.x <code>card</code> styles.
 * @property title - Text rendered in the <code>card-header</code> element.
 * @property children - Components rendered in the <code>card-body</code> element.
 */
class Card extends Component {
    render() {
        const {title, children} = this.props;

        return (
            <div className="card">
                <div className="card-header">
                    {title}
                </div>
                <div className="card-body">
                    {children}
                </div>
            </div>
        );
    }
}

export default Card;