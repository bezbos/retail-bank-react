/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import authService from '../../services/authService';
import bankAccountService from '../../services/domain/bankAccountService';
import Card from '../common/card';
import Pagination from '../common/pagination';
import Table from '../common/table';

/**
 * @description Domain specific component that renders a table of Bank Accounts
 */
class BankAccounts extends Component {

    //region Properties
    isAdmin = authService.currentUserIsAdmin();
    state = {
        bankAccounts: [],
        nextPage: null,
        currentPage: null,
        previousPage: null,
        pageCount: null
    };
    //endregion

    //region Lifecycle Hooks
    async componentDidMount() {
        await this.getBankAccountsRangeAndUpdateState();
    }

    //endregion

    //region Event Handlers
    handlePagination = async page => {
        try {
            const {data} = await bankAccountService.getBankAccountsRange(page);

            this.setState({
                bankAccounts: data.items,
                nextPage: data.nextPage,
                currentPage: data.currentPage,
                previousPage: data.previousPage,
                pageCount: data.pageCount
            });
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                await this.getBankAccountsRangeAndUpdateState();
            }
        }
    };
    //endregion

    //region Helper Methods
    /**
     * Retrieves a range of bank accounts from an API(always gets the 0-th index page) and updates the state.
     */
    getBankAccountsRangeAndUpdateState = async () => {
        const {data} = await bankAccountService.getBankAccountsRange(0);

        this.setState({
            bankAccounts: data.items,
            nextPage: data.nextPage,
            currentPage: data.currentPage,
            previousPage: data.previousPage,
            pageCount: data.pageCount
        });
    };

    /**
     * Transforms bank accounts into something more UI friendly.
     * Essentially it decorates existing data with components and adds event handlers.
     */
    getDecoratedBankAccounts = () => {
        const isAdmin = this.isAdmin;

        return this.state.bankAccounts.map(({id, status, type, customer, balance, details}) => ({
                id,
                customer: isAdmin
                    ? <Link className="ul-disable" to={`/customer/${customer.id}`}>{customer.personalDetails}</Link>
                    : customer.personalDetails,
                balance: `${balance}$`,
                type: type.code,
                status: status.code,
                details: details,
                formLink: isAdmin && <Link className="btn btn-sm btn-outline-primary" to={`/bankAccount/${id}`}>Open</Link>
            })
        );
    };

    //endregion

    render() {
        const decoratedBankAccounts = this.getDecoratedBankAccounts();
        const {nextPage, currentPage, previousPage, pageCount} = this.state;
        const isAdmin = this.isAdmin;

        return (
            <div className="row">
                <div className="col-12">
                    <Card
                        title={`Bank Accounts table (${decoratedBankAccounts.length} ${decoratedBankAccounts.length === 1 ? 'entry' : 'entries'})`}>
                        {isAdmin && <Link className="btn btn-primary mb-3" to={`/bankAccount/new`}>Create new</Link>}
                        <Table
                            columnNames={['ID', 'Customer', 'Balance', 'Type', 'Status', 'Details', isAdmin ? 'Action' : '']}
                            rows={decoratedBankAccounts}
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

export default BankAccounts;