/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

import React, {Component} from 'react';
import TableRow from './tableRow';

/**
 * @description For each element in the <code>rows</code> array, a <code>&#60;tbody&#62;</code> element containing a <code>&#60;TableRow&#62;</code> component is rendered.
 * @property rows - An array of objects that will be rendered.
 * @property headerColumn - A string representing the property name that will be rendered in the <code>&#60;th&#62;</code> element. The parent <code>&#60;TableHead&#62;</code> component will pass in a default value of <code>"id"</code> if no value is provided for this parameter.
 * @property args - Any additional prop arguments will be passed to the <code>&#60;TableRow&#62;</code> component.
 */
class TableBody extends Component {
    render() {
        const {rows, headerColumn, ...args} = this.props;

        return (
            <tbody>
            {rows.size !== 0
                ? rows.map(row =>
                    <TableRow item={row}
                              dataColumns={Object.keys(row)}
                              headerColumn={headerColumn}
                              key={row[headerColumn]}
                              {...args}
                    />)
                : <tr>
                    <th>No items to show.</th>
                </tr>
            }
            </tbody>
        );
    }
}

export default TableBody;