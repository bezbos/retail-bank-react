/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

import React, {Component} from 'react';
import TableBody from './tableBody';
import TableHead from './tableHead';

/**
 * @description For each element in the <code>rows</code> array, a <code>&#60;tbody&#62;</code> element containing a <code>&#60;TableRow&#62;</code> component is rendered.
 * @property rows - An array of objects that will be rendered.
 * @property columnNames - A string array containing names of columns to be rendered.
 * @property headerColumn - A string representing the property name that will be rendered in the <code>&#60;th&#62;</code> element. The parent <code>&#60;TableHead&#62;</code> component will pass in a default value of <code>"id"</code> if no value is provided for this parameter.
 * @property args - Any additional prop arguments passed to this component.
 */
class Table extends Component {
    render() {
        const {rows, columnNames, headerColumn, ...args} = this.props;

        return (
            <table className="table table-sm table-hover table-borderless">
                <TableHead columnNames={columnNames}/>
                <TableBody
                    rows={rows}
                    headerColumn={headerColumn || 'id'}
                    {...args}
                />
            </table>
        );
    }
}

export default Table;