/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

import React, {Component} from 'react';

/**
 * @description Renders a <code>&#60;thead&#62;</code> element. For each string in the <code>columnNames</code> array a <code>&#60;th&#62;</code> element is rendered.
 * @property columnNames - A string array containing names of columns to be rendered.
 */
class TableHead extends Component {
    render() {
        const {columnNames} = this.props;

        return (
            <thead>
            <tr>
                {columnNames.map(col => <th key={col} scope="col">{col}</th>)}
            </tr>
            </thead>
        );
    }
}

export default TableHead;