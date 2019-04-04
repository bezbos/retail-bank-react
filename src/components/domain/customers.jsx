/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import authService from '../../services/authService';
import customerService from '../../services/domain/customerService';
import Card from '../common/card';
import Pagination from '../common/pagination';
import Table from '../common/table';

/**
 * @description Domain specific component that renders a table of Customers
 */
class Customers extends Component {

    //region Properties
    isAdmin = authService.currentUserIsAdmin();
    state = {
        customers: [],
        nextPage: null,
        currentPage: null,
        previousPage: null,
        pageCount: null
    };
    //endregion

    //region Lifecycle Hooks
    async componentDidMount() {
        await this.getCustomersRangeAndUpdateState();
    }

    //endregion

    //region Event Handlers
    handlePagination = async page => {

        await this.getCustomersRangeAndUpdateState(page)
            .catch(async ex => ex.response && ex.response.status === 404
                ? await this.getCustomersRangeAndUpdateState()
                : null
            );
    };
    //endregion

    //region Helper Methods
    /**
     * Retrieves a range of customers from an API and updates the state.
     * @param pageIndex - If no argument is passed the parameter is set to <code>0</code>.
     */
    getCustomersRangeAndUpdateState = async (pageIndex = 0) => {
        const {data} = await customerService.getCustomersRange(pageIndex);

        this.setState({
            customers: data.items,
            nextPage: data.nextPage,
            currentPage: data.currentPage,
            previousPage: data.previousPage,
            pageCount: data.pageCount
        });
    };

    /**
     * Transforms customers into something more UI friendly.
     * Essentially it decorates existing data with components and adds event handlers.
     */
    getDecoratedCustomers = () => {
        const isAdmin = this.isAdmin;

        return this.state.customers.map(({id, address, branch, personalDetails, contactDetails}) => ({
                id,
                address: isAdmin
                    ? <Link className="ul-disable" to={`/address/${address.id}`}>{address.line1}</Link>
                    : address.line1,
                branch: isAdmin ? <Link className="ul-disable" to={`/branch/${branch.id}`}>{branch.details}</Link>
                    : branch.details,
                personalDetails,
                contactDetails,
                formLink: isAdmin && <Link className="btn btn-sm btn-outline-primary" to={`/customer/${id}`}>Open</Link>
            })
        );
    };

    //endregion

    render() {
        const decoratedCustomer = this.getDecoratedCustomers();
        const {nextPage, currentPage, previousPage, pageCount} = this.state;
        const isAdmin = this.isAdmin;

        return (
            <div className="row">
                <div className="col-12">
                    <Card
                        title={`Customers table (${decoratedCustomer.length} ${decoratedCustomer.length === 1 ? 'entry' : 'entries'})`}>
                        {isAdmin && <Link className="btn btn-primary mb-3" to={`/customer/new`}>Create new</Link>}
                        <Table
                            columnNames={['ID', 'Address', 'Branch', 'Personal Details', 'Contact Details', isAdmin ? 'Action' : '']}
                            rows={decoratedCustomer}
                        />
                        <Pagination
                            nextPage={nextPage}
                            currentPage={currentPage}
                            previousPage={previousPage}
                            pageCount={pageCount}
                            onPagination={this.handlePagination}
                        />
                    </Card>
                </div>
            </div>
        );
    }
}

export default Customers;