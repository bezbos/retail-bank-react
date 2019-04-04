/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

import React, {Component} from 'react';

/**
 * @description This is a pagination component specific to this project. To work properly it needs to receive certain pages information from the server.
 * @property nextPage - Index for the next page.
 * @property currentPage - Index of the currently selected page.
 * @property previousPage - Index for the previous page.
 * @property pageCount - Number of pages available.
 * @property onPagination - Event handler for when the page is changed.
 */
class Pagination extends Component {
    render() {
        const {nextPage, currentPage, previousPage, pageCount, onPagination} = this.props;

        return (
            <nav>
                <ul className="pagination pagination-center">
                    <li className={`page-item ${previousPage === null ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPagination(previousPage)}>Previous</button>
                    </li>
                    <li className="page-item">
                        {(currentPage - 2) < 0
                            ? null
                            : <button className="page-link"
                                      onClick={() => onPagination(currentPage - 2)}>{currentPage - 2}</button>
                        }
                    </li>
                    <li className="page-item">
                        {(currentPage - 1) < 0
                            ? null
                            : <button className="page-link"
                                      onClick={() => onPagination(currentPage - 1)}>{currentPage - 1}</button>
                        }
                    </li>
                    <li className="page-item active">
                        <button className="page-link">{currentPage || '0'}</button>
                    </li>
                    <li className="page-item">
                        {(currentPage + 1) <= pageCount && nextPage !== null
                            ? <button className="page-link"
                                      onClick={() => onPagination(currentPage + 1)}>{currentPage + 1}</button>
                            : null
                        }
                    </li>
                    <li className="page-item">
                        {(currentPage + 2) < pageCount && nextPage !== null
                            ? <button className="page-link"
                                      onClick={() => onPagination(currentPage + 2)}>{currentPage + 2}</button>
                            : null
                        }
                    </li>
                    <li className={`page-item ${nextPage === null || nextPage > pageCount ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPagination(nextPage)}>Next</button>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;