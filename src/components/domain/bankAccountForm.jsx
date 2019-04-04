/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {toast} from 'react-toastify';
import bankAccountService from '../../services/domain/bankAccountService';
import customerService from '../../services/domain/customerService';
import refAccountStatusService from '../../services/domain/refAccountStatusService';
import refAccountTypeService from '../../services/domain/refAccountTypeService';
import exceptions from '../../utils/exceptions';
import AsyncSelectLabeled from '../common/asyncSelectLabeled';
import Card from '../common/card';
import Input from '../common/input';

/**
 * @description Domain specific component for taking <b>Bank Account</b> related input.
 */
class BankAccountForm extends Component {

    //region Properties
    // We check if the query string "id" is TRUTHY and it DOESN'T match to "new" to determine if the item exists.
    isExistingBankAccount = this.props.match.params['id'] && this.props.match.params['id'] !== 'new';

    state = {
        bankAccount: {
            id: '',
            status: {
                id: '',
                code: ''
            },
            type: {
                id: '',
                code: ''
            },
            customer: {
                id: '',
                personalDetails: ''
            },
            balance: '',
            details: ''
        },
        addresses: [],
        banks: [],
        types: []
    };
    //endregion

    //region Lifecycle Hooks
    async componentDidMount() {
        const {params} = this.props.match;

        if (this.isExistingBankAccount) {
            const {data} = await bankAccountService.getBankAccount(params['id']);
            this.setState({bankAccount: this.mapBankAccountToViewModel(data)})
        }
    }

    //endregion

    //region Event Handlers
    handleSubmit = async e => {
        e.preventDefault();

        try {
            this.isExistingBankAccount
                ? await bankAccountService.updateBankAccount(this.state.bankAccount)
                : await bankAccountService.addBankAccount(this.state.bankAccount);
        } catch (ex) {
            exceptions.showHttpException(ex);
            return;
        }

        this.props.history.push('/bankAccounts');
        this.isExistingBankAccount
            ? toast.success('Updated successfully!')
            : toast.success('Added successfully!');
    };

    handleChange = ({currentTarget: input}) => {
        const bankAccount = {...this.state.bankAccount};
        _.set(bankAccount, input.name, input.value);

        this.setState({bankAccount});
    };

    handleSelectChange = ({value, label}, {name: inputName}) => {
        const bankAccount = {...this.state.bankAccount};

        switch (inputName) {
            case 'status':
                _.set(bankAccount, 'status.id', value);
                _.set(bankAccount, 'status.code', label);
                break;
            case 'type':
                _.set(bankAccount, 'type.id', value);
                _.set(bankAccount, 'type.code', label);
                break;
            case 'customer':
                _.set(bankAccount, 'customer.id', value);
                _.set(bankAccount, 'customer.personalDetails', label);
                break;
            default:
                break;
        }


        this.setState({bankAccount});
    };

    handleDelete = async (id) => {
        await bankAccountService.deleteBankAccount(id)
            .then(() => {
                toast.success('Deleted successfully.');
                this.props.history.push('/bankAccounts');
            })
            .catch(ex => exceptions.showHttpException(ex));
    };

    //endregion

    //region Helper Methods
    mapBankAccountToViewModel = ({id, status, type, customer, balance, details}) => {
        return {
            id,
            status: {
                id: status.id,
                code: status.code
            },
            type: {
                id: type.id,
                code: type.code
            },
            customer: {
                id: customer.id,
                personalDetails: customer.personalDetails
            },
            balance,
            details
        }
    };

    mapStatusOrTypeToSelectModel = ({id, code}) => {
        return {value: id, label: code}
    };

    mapCustomerToSelectModel = ({id, personalDetails}) => {
        return {value: id, label: personalDetails}
    };
    //endregion

    //region AsyncSelect Event Handlers
    filterStatusesAsync = async (input) => {
        const {data} = await refAccountStatusService.getRefAccountStatuses();
        const processedStatuses = data.map(x => this.mapStatusOrTypeToSelectModel(x));
        this.setState({types: processedStatuses});

        return this.state.types.filter(a => a.label.toLowerCase().includes(input.toLowerCase()));
    };

    filterTypesAsync = async (input) => {
        const {data} = await refAccountTypeService.getRefAccountTypes();
        const processedTypes = data.map(x => this.mapStatusOrTypeToSelectModel(x));
        this.setState({types: processedTypes});

        return this.state.types.filter(a => a.label.toLowerCase().includes(input.toLowerCase()));
    };

    filterCustomersAsync = async (input) => {
        const {data} = await customerService.getCustomersByPersonalDetails(input);
        const processedCustomers = data.items.map(x => this.mapCustomerToSelectModel(x));
        this.setState({types: processedCustomers});

        return this.state.types.filter(a => a.label.toLowerCase().includes(input.toLowerCase()));
    };

    statusSelectorOptions = input =>
        new Promise(resolve => {
            setTimeout(async () => {
                resolve(await this.filterStatusesAsync(input));
            }, 1000)
        });

    typeSelectorOptions = input =>
        new Promise(resolve => {
            setTimeout(async () => {
                resolve(await this.filterTypesAsync(input));
            }, 1000)
        });

    customerSelectorOptions = input =>
        new Promise(resolve => {
            setTimeout(async () => {
                resolve(await this.filterCustomersAsync(input));
            }, 1000)
        });

    //endregion

    render() {
        const {id, details, balance, status, type, customer} = this.state.bankAccount;

        return (
            <React.Fragment>
                <Card title="Bank Account form">
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            label="Details"
                            note="Optional account description."
                            value={details}
                            onChange={this.handleChange}
                        />
                        <Input
                            label="Balance"
                            note="Current account balance."
                            value={`${balance} $`}
                            disabled
                        />
                        <AsyncSelectLabeled
                            label="Status"
                            name="status"
                            note="Select the account status."
                            value={{value: status.id, label: status.code}}
                            onChange={this.handleSelectChange}
                            loadOptions={this.statusSelectorOptions}
                            cacheOptions
                            defaultOptions
                        />
                        <AsyncSelectLabeled
                            label="Type"
                            name="type"
                            note="Select the account type."
                            value={{value: type.id, label: type.code}}
                            onChange={this.handleSelectChange}
                            loadOptions={this.typeSelectorOptions}
                            cacheOptions
                            defaultOptions
                        />
                        <AsyncSelectLabeled
                            label="Owner"
                            name="customer"
                            note="Select the account owner/customer."
                            value={{value: customer.id, label: customer.personalDetails}}
                            onChange={this.handleSelectChange}
                            loadOptions={this.customerSelectorOptions}
                            cacheOptions
                            defaultOptions
                        />
                        <div className="row">
                            <div className="col-8 col-sm-10">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                            <div className="col-4 col-sm-2">
                                {this.isExistingBankAccount
                                    ? <button className="btn btn-danger" type="button"
                                              onClick={() => this.handleDelete(id)}>Delete
                                    </button>
                                    : null
                                }
                            </div>

                        </div>
                    </form>
                </Card>
            </React.Fragment>
        );
    }
}

export default BankAccountForm;