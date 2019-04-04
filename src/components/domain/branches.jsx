/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import authService from '../../services/authService';
import branchService from '../../services/domain/branchService';
import exceptions from '../../utils/exceptions';
import Card from '../common/card';
import Pagination from '../common/pagination';
import Table from '../common/table';

/**
 * @description Domain specific component that renders a table of Branches
 */
class Branches extends Component {

    //region Properties
    isAdmin = authService.currentUserIsAdmin();
    state = {
        branches: [],
        nextPage: null,
        currentPage: null,
        previousPage: null,
        pageCount: null
    };
    //endregion

    //region Lifecycle Hooks
    async componentDidMount() {
        await this.getBranchesRangeAndUpdateState();
    }

    //endregion

    //region Event Handlers
    handleDelete = async (id) => {
        // Preserve original list, in case deletion goes wrong.
        const originalBranches = this.state.branches;

        const filteredBranches = originalBranches.filter(b => b.id !== id);
        this.setState({branches: filteredBranches});

        await branchService.deleteBranch(id)
            .then(async () => {
                toast.success('Deleted successfully.');

                if (filteredBranches.length === 0) await this.getBranchesRangeAndUpdateState();
            })
            .catch(ex => {
                exceptions.showHttpException(ex);

                this.setState({branches: originalBranches});
            })


    };

    handlePagination = async page => {
        const {data} = await branchService.getBranchesRange(page)
            .then(() => this.setState({
                branches: data.items,
                nextPage: data.nextPage,
                currentPage: data.currentPage,
                previousPage: data.previousPage,
                pageCount: data.pageCount
            }))
            .catch(async ex => ex.response && ex.response.status === 404
                ? await this.getBranchesRangeAndUpdateState()
                : null
            )
    };
    //endregion

    //region Helper Methods
    /**
     * Retrieves a range of branches from the server(always gets the 0-th index page) and updates the state.
     */
    getBranchesRangeAndUpdateState = async () => {
        const {data} = await branchService.getBranchesRange(0);

        this.setState({
            branches: data.items,
            nextPage: data.nextPage,
            currentPage: data.currentPage,
            previousPage: data.previousPage,
            pageCount: data.pageCount
        });
    };

    /**
     * Transforms branches into something more UI friendly.
     * Essentially it decorates existing data with components and adds event handlers.
     */
    getDecoratedBranches = () => {
        const isAdmin = this.isAdmin;

        return this.state.branches.map(branch => ({
                id: branch.id,
                details: isAdmin
                    ? <Link className="ul-disable" to={`/branch/${branch.id}`}>{branch.details}</Link>
                    : branch.details,
                address: isAdmin
                    ? <Link className="ul-disable" to={`/address/${branch.address.id}`}>{branch.address.line1}</Link>
                    : branch.address.line1,
                bank: isAdmin
                    ? <Link className="ul-disable" to={`/bank/${branch.bank.id}`}>{branch.bank.details}</Link>
                    : branch.bank.details,
                type: isAdmin
                    ? <Link className="ul-disable" to={`/refBranchType/${branch.type.id}`}>{branch.type.code}</Link>
                    : branch.type.code,
                onDelete: isAdmin && <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.handleDelete(branch.id)}
                >
                    Delete
                </button>
            })
        );
    };

    //endregion

    render() {
        const decoratedBranches = this.getDecoratedBranches();
        const {nextPage, currentPage, previousPage, pageCount} = this.state;
        const isAdmin = this.isAdmin;

        return (
            <div className="row">
                <div className="col-12">
                    <Card
                        title={`Branches table (${decoratedBranches.length} ${decoratedBranches.length === 1 ? 'entry' : 'entries'})`}>
                        {isAdmin && <Link className="btn btn-primary mb-3" to={`/branch/new`}>Create new</Link>}
                        <Table
                            columnNames={['ID', 'Details', 'Address', 'Bank', 'Type', isAdmin ? 'Action' : '']}
                            rows={decoratedBranches}
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

export default Branches;