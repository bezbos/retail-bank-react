/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import transactionService from '../../services/domain/transactionService';
import exceptions from '../../utils/exceptions';
import Card from '../common/card';
import Pagination from '../common/pagination';
import Table from '../common/table';

/**
 * @description Domain specific component that renders a table of Transactions
 */
class Transactions extends Component {

    //region Properties
    state = {
        transactions: [],
        nextPage: null,
        currentPage: null,
        previousPage: null,
        pageCount: null
    };
    //endregion

    //region Lifecycle Hooks
    async componentDidMount() {
        await this.getTransactionsRangeAndUpdateState();
    }

    //endregion

    //region Event Handlers
    handlePagination = async page => {

        await this.getTransactionsRangeAndUpdateState(page)
            .catch(async ex => ex.response && ex.response.status === 404
                ? await this.getTransactionsRangeAndUpdateState()
                : null
            );
    };
    //endregion

    //region Helper Methods
    /**
     * Retrieves a range of transactions from an API and updates the state.
     * @param pageIndex - If no argument is passed the parameter is set to <code>0</code>.
     */
    getTransactionsRangeAndUpdateState = async (pageIndex = 0) => {
        const {data} = await transactionService.getTransactionsRange(pageIndex)
            .catch(ex => exceptions.showHttpException(ex));

        this.setState({
            transactions: data.items,
            nextPage: data.nextPage,
            currentPage: data.currentPage,
            previousPage: data.previousPage,
            pageCount: data.pageCount
        });
    };

    /**
     * Transforms transactions into something more UI friendly.
     * Essentially it decorates existing data with components and adds event handlers.
     */
    getDecoratedTransactions = () => {
        return this.state.transactions.map(({id, senderAccount, receiverAccount, merchant, type, date, amount, details}) => ({
                id,
                senderAccount: <Link className="ul-disable" to={`/bankAccount/${senderAccount.id}`}>Sender</Link>,
                receiverAccount: <Link className="ul-disable" to={`/bankAccount/${receiverAccount.id}`}>Receiver</Link>,
                merchant: merchant.details,
                type: type.code,
                date,
                amount,
                details
            })
        );
    };

    //endregion

    render() {
        const decoratedTransactions = this.getDecoratedTransactions();
        const {nextPage, currentPage, previousPage, pageCount} = this.state;

        return (
            <div className="row">
                <div className="col-12">
                    <Card
                        title={`Transactions table (${decoratedTransactions.length} ${decoratedTransactions.length === 1 ? 'entry' : 'entries'})`}>
                        <Link className="btn btn-primary mb-3" to={`/transaction/new`}>Create payment</Link>
                        <Table
                            columnNames={['ID', 'Sender', 'Receiver', 'Merchant', 'Type', 'Date', 'Amount', 'Details']}
                            rows={decoratedTransactions}
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

export default Transactions;