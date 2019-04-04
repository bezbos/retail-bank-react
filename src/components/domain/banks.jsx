/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import authService from '../../services/authService';
import bankService, {getBanksRange} from '../../services/domain/bankService';
import exceptions from '../../utils/exceptions';
import Card from '../common/card';
import Pagination from '../common/pagination';
import Table from '../common/table';

/**
 * @description Domain specific component that renders a table of Banks
 */
class Banks extends Component {

    //region Properties
    isAdmin = authService.currentUserIsAdmin();
    state = {
        banks: [],
        nextPage: null,
        currentPage: null,
        previousPage: null,
        pageCount: null
    };
    //endregion

    //region Lifecycle Hooks
    async componentDidMount() {
        await this.getBanksRangeAndUpdateState();
    }

    //endregion

    //region Event Handlers
    handleDelete = async (id) => {
        // Preserve original list, in case deletion goes wrong.
        const originalBanks = this.state.banks;

        const banks = originalBanks.filter(b => b.id !== id);
        this.setState({banks});

        await bankService.deleteBank(id)
            .then(async () => {
                toast.success('Deleted successfully.');

                if (banks.length === 0)
                    await this.getBanksRangeAndUpdateState();
            })
            .catch(ex => {
                exceptions.showHttpException(ex);
                this.setState({banks: originalBanks});
            });
    };

    handlePagination = async page => {
        const {data} = await getBanksRange(page)
            .then(() => this.setState({
                banks: data.items,
                nextPage: data.nextPage,
                currentPage: data.currentPage,
                previousPage: data.previousPage,
                pageCount: data.pageCount
            }))
            .catch(async ex => ex.response && ex.response.status === 404
                ? await this.getBanksRangeAndUpdateState()
                : null
            );
    };
    //endregion

    //region Helper Methods
    /**
     * Retrieves a range of banks from the server(always gets the 0-th index page) and updates the state.
     */
    getBanksRangeAndUpdateState = async () => {
        const {data} = await getBanksRange(0);

        this.setState({
            banks: data.items,
            nextPage: data.nextPage,
            currentPage: data.currentPage,
            previousPage: data.previousPage,
            pageCount: data.pageCount
        });
    };

    /**
     * Transforms banks into something more UI friendly.
     * Essentially it decorates existing data with components and adds event handlers.
     */
    getDecoratedBanks = () => {
        const isAdmin = this.isAdmin;

        return this.state.banks.map(bank => ({
                id: bank.id,
                details: isAdmin
                    ? <Link className="ul-disable" to={`/bank/${bank.id}`}>{bank.details}</Link>
                    : bank.details,
                onDelete: isAdmin
                    ? <button className="btn btn-sm btn-danger" onClick={() => this.handleDelete(bank.id)}>Delete</button>
                    : null
            })
        );
    };

    //endregion

    render() {
        const decoratedBanks = this.getDecoratedBanks();
        const {nextPage, currentPage, previousPage, pageCount} = this.state;
        const isAdmin = this.isAdmin;

        return (
            <div className="row">
                <div className="col-12">
                    <Card
                        title={`Banks table (${decoratedBanks.length} ${decoratedBanks.length === 1 ? 'entry' : 'entries'})`}>
                        {isAdmin && <Link className="btn btn-primary mb-3" to={`/bank/new`}>Create new</Link>}
                        <Table
                            columnNames={['ID', 'Details', isAdmin ? 'Action' : '']}
                            rows={decoratedBanks}
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

export default Banks;