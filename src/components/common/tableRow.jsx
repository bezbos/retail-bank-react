/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

import React, {Component} from 'react';

/**
 * @description Renders a <code>&#60;tr&#62;</code> element containing <code>item</code> property values.
 * @property item - Item whose property values will be rendered.
 * @property dataColumns - A string array representing property names of the <code>item</code> object.
 * @property headerColumn - A string representing the property name that will be rendered in the <code>&#60;th&#62;</code> element. The parent <code>&#60;TableHead&#62;</code> component will pass in a default value of <code>"id"</code> if no value is provided for this parameter.
 */
class TableRow extends Component {
    render() {
        const {item, dataColumns, headerColumn} = this.props;

        return (
            <tr>
                <th scope="row">{item[headerColumn]}</th>
                {dataColumns.map(col => col !== headerColumn
                    ? <td key={item[headerColumn] + col}>
                        {item[col]}
                    </td>
                    : null
                )}
            </tr>
        );
    }
}

export default TableRow;