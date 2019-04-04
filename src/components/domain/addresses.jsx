/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import authService from '../../services/authService';
import addressService, {getAddressesRange} from '../../services/domain/addressService';
import exceptions from '../../utils/exceptions';
import Card from '../common/card';
import Pagination from '../common/pagination';
import Table from '../common/table';

/**
 * @description Domain specific component that renders a table of Addresses
 */
class Addresses extends Component {

    //region Properties
    isAdmin = authService.currentUserIsAdmin();
    state = {
        addresses: [],
        nextPage: null,
        currentPage: null,
        previousPage: null,
        pageCount: null
    };
    //endregion

    //region Lifecycle Hooks
    async componentDidMount() {
        await this.getAddressesRangeAndUpdateState()
            .catch(ex => exceptions.showHttpException(ex));
    }

    //endregion

    //region Event Handlers
    handleDelete = async (id) => {

        // Preserve original list, in case deletion goes wrong.
        const originalAddresses = this.state.addresses;

        const filteredAddresses = originalAddresses.filter(b => b.id !== id);
        this.setState({addresses: filteredAddresses});

        await addressService.deleteAddress(id)
            .then(async () => {
                toast.success('Deleted successfully.');
                if (filteredAddresses.length === 0) await this.getAddressesRangeAndUpdateState();
            })
            .catch(ex => {
                exceptions.showHttpException(ex);
                this.setState({addresses: originalAddresses});
            });
    };

    handlePagination = async page => {
        try {
            const {data} = await getAddressesRange(page);

            this.setState({
                addresses: data.items,
                nextPage: data.nextPage,
                currentPage: data.currentPage,
                previousPage: data.previousPage,
                pageCount: data.pageCount
            });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                await this.getAddressesRangeAndUpdateState();
            }
        }
    };
    //endregion

    //region Helper Methods
    /**
     * Retrieves a range of addresses from the server(always gets the 0-th index page) and updates the state.
     */
    getAddressesRangeAndUpdateState = async () => {
        const {data} = await getAddressesRange(0);

        this.setState({
            addresses: data.items,
            nextPage: data.nextPage,
            currentPage: data.currentPage,
            previousPage: data.previousPage,
            pageCount: data.pageCount
        });
    };

    /**
     * Transforms addresses into something more UI friendly.
     * Essentially it decorates existing data with components and adds event handlers.
     */
    getDecoratedAddresses = () => {
        const isAdmin = this.isAdmin;

        return this.state.addresses.map(address => ({
                id: address.id,
                line1: isAdmin
                    ? <Link className="ul-disable" to={`/address/${address.id}`}>{address.line1}</Link>
                    : address.line1,
                line2: address.line2,
                zipPostcode: address.zipPostcode,
                stateProvinceCountry: address.stateProvinceCountry,
                country: address.country,
                otherDetails: address.otherDetails,
                onDelete: isAdmin && <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.handleDelete(address.id)}
                >
                    Delete
                </button>
            })
        );
    };

    //endregion

    render() {
        const decoratedAddresses = this.getDecoratedAddresses();
        const {nextPage, currentPage, previousPage, pageCount} = this.state;
        const isAdmin = this.isAdmin;

        return (
            <div className="row">
                <div className="col-12">
                    <Card
                        title={`Addresses table (${decoratedAddresses.length} ${decoratedAddresses.length === 1 ? 'entry' : 'entries'})`}>
                        {isAdmin && <Link className="btn btn-primary mb-3" to={`/address/new`}>Create new</Link>}
                        <Table
                            columnNames={['ID', 'Line 1', 'Line 2', 'Zip Postcode', 'State Province Country', 'Country', 'Other Details', isAdmin ? 'Action' : '']}
                            rows={decoratedAddresses}
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

export default Addresses;