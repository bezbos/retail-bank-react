/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {toast} from 'react-toastify';
import addressService from '../../services/domain/addressService';
import branchService from '../../services/domain/branchService';
import customerService from '../../services/domain/customerService';
import exceptions from '../../utils/exceptions';
import AsyncSelectLabeled from '../common/asyncSelectLabeled';
import Card from '../common/card';
import Input from '../common/input';

/**
 * @description Domain specific component that renders a table of
 */
class CustomerForm extends Component {

    //region Properties
    // We check if the query string "id" is TRUTHY and it DOESN'T match to "new" to determine if the item exists.
    isExistingCustomer = this.props.match.params['id'] && this.props.match.params['id'] !== 'new';

    state = {
        customer: {
            id: '',
            address: {
                id: '',
                line1: ''
            },
            branch: {
                id: '',
                details: ''
            },
            personalDetails: '',
            contactDetails: ''
        },
        addresses: [],
        branches: []
    };
    //endregion

    //region Lifecycle Hooks
    async componentDidMount() {
        const {params} = this.props.match;

        if (this.isExistingCustomer) {
            const {data} = await customerService.getCustomer(params.id);
            this.setState({customer: this.mapCustomerToViewModel(data)})
        }
    }

    //endregion

    //region Event Handlers
    handleSubmit = async e => {
        e.preventDefault();

        try {
            this.isExistingCustomer
                ? await customerService.updateCustomer(this.state.customer)
                : await customerService.addCustomer(this.state.customer);
        } catch (ex) {
            exceptions.showHttpException(ex);
            return;
        }

        this.props.history.push('/customers');
        this.isExistingCustomer
            ? toast.success('Updated successfully!')
            : toast.success('Added successfully!');
    };

    handleChange = ({currentTarget: input}) => {
        const customer = {...this.state.customer};
        _.set(customer, input.name, input.value);

        this.setState({customer});
    };

    handleSelectChange = ({value, label}, {name: inputName}) => {
        const customer = {...this.state.customer};

        switch (inputName) {
            case 'address':
                _.set(customer, 'address.id', value);
                _.set(customer, 'address.line1', label);
                break;
            case 'branch':
                _.set(customer, 'branch.id', value);
                _.set(customer, 'branch.details', label);
                break;
            default:
                break;
        }

        this.setState({customer});
    };

    handleDelete = async (id) => {

        await customerService.deleteCustomer(id)
            .then(() => {
                this.props.history.push('/customers');
                toast.success('Deleted successfully.');
            })
            .catch(ex => exceptions.showHttpException(ex));
    };
    //endregion

    //region Helper Methods
    mapCustomerToViewModel = ({id, address, branch, personalDetails, contactDetails}) => {
        return {
            id,
            address: {
                id: address.id,
                line1: address.line1
            },
            branch: {
                id: branch.id,
                details: branch.details
            },
            personalDetails,
            contactDetails
        }
    };

    mapAddressToSelectModel = ({id, line1}) => {
        return {value: id, label: line1}
    };

    mapBranchToSelectModel = ({id, details}) => {
        return {value: id, label: details}
    };
    //endregion

    //region AsyncSelect Event Handlers
    filterAddressesAsync = async (input) => {
        const {data} = await addressService.getAddressesByLine1(input);
        const processedAddresses = data.items.map(x => this.mapAddressToSelectModel(x));
        this.setState({addresses: processedAddresses});

        return this.state.addresses.filter(a => a.label.toLowerCase().includes(input.toLowerCase()));
    };

    filterBranchesAsync = async (input) => {
        const {data} = await branchService.getBranchesByDetails(input);
        const processedBranches = data.items.map(x => this.mapBranchToSelectModel(x));
        this.setState({branches: processedBranches});

        return this.state.branches.filter(a => a.label.toLowerCase().includes(input.toLowerCase()));
    };

    addressSelectorOptions = input =>
        new Promise(resolve => {
            setTimeout(async () => {
                resolve(await this.filterAddressesAsync(input));
            }, 1000)
        });

    branchSelectorOptions = input =>
        new Promise(resolve => {
            setTimeout(async () => {
                resolve(await this.filterBranchesAsync(input));
            }, 1000)
        });

    //endregion

    render() {
        const {id, address, branch, personalDetails, contactDetails} = this.state.customer;

        return (
            <React.Fragment>
                <Card title="Customer form">
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            label="Personal Details"
                            note="Describe the person by stating name, age, culture, background..."
                            value={personalDetails}
                            onChange={this.handleChange}
                        />
                        <Input
                            label="Contact Details"
                            note="Email, phone number and other contacts."
                            value={contactDetails}
                            onChange={this.handleChange}
                        />
                        <AsyncSelectLabeled
                            label="Address"
                            name="address"
                            note="Select the address."
                            value={{value: address.id, label: address.line1}}
                            onChange={this.handleSelectChange}
                            loadOptions={this.addressSelectorOptions}
                            cacheOptions
                            defaultOptions
                        />
                        <AsyncSelectLabeled
                            label="Branch"
                            name="branch"
                            note="Select the branch."
                            value={{value: branch.id, label: branch.details}}
                            onChange={this.handleSelectChange}
                            loadOptions={this.branchSelectorOptions}
                            cacheOptions
                            defaultOptions
                        />
                        <div className="row">
                            <div className="col-8 col-sm-10">
                                <button className="btn btn-primary" type="submit">Submit</button>
                            </div>
                            <div className="col-4 col-sm-2">
                                {this.isExistingCustomer
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

export default CustomerForm;