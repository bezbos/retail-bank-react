/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import _ from 'lodash';
import React, {Component} from 'react';
import AsyncSelect from 'react-select/lib/Async';
import {toast} from 'react-toastify';
import addressService from '../../services/domain/addressService';
import bankService from '../../services/domain/bankService';
import branchService from '../../services/domain/branchService';
import refBranchTypeService from '../../services/domain/refBranchTypeService';
import exceptions from '../../utils/exceptions';
import Card from '../common/card';
import Input from '../common/input';

/**
 * @description Domain specific component for taking <b>Branch</b> related input.
 */
class BranchesForm extends Component {

    //region Properties
    // We check if the query string "id" is TRUTHY and it DOESN'T match to "new" to determine if the item exists.
    isExistingBranch = this.props.match.params['id'] && this.props.match.params['id'] !== 'new';
    state = {
        branch: {
            id: '',
            details: '',
            address: {
                id: '',
                line1: ''
            },
            bank: {
                id: '',
                details: ''
            },
            type: {
                id: '',
                code: ''
            }
        },
        addresses: [],
        banks: [],
        types: []
    };
    //endregion

    //region Lifecycle Hooks
    async componentDidMount() {
        const {params} = this.props.match;

        if (this.isExistingBranch) {
            const {data} = await branchService.getBranch(params['id']);
            this.setState({branch: this.mapBranchDataToViewModel(data)})
        }
    }

    //endregion

    //region Event Handlers
    handleSubmit = async e => {
        e.preventDefault();

        try {
            this.isExistingBranch
                ? await branchService.updateBranch(this.state.branch)
                : await branchService.addBranch(this.state.branch);
        } catch (ex) {
            if (ex.response.status)
                exceptions.showHttpException(ex.response.status);
            return;
        }

        this.props.history.push('/branches');
        this.isExistingBranch
            ? toast.success('Updated successfully!')
            : toast.success('Added successfully!');
    };

    handleChange = ({currentTarget: input}) => {
        const branch = {...this.state.branch};
        _.set(branch, input.name, input.value);

        this.setState({branch});
    };

    handleSelectChange = ({value, label}, {name: inputName}) => {
        const branch = {...this.state.branch};

        switch (inputName) {
            case 'address':
                _.set(branch, 'address.id', value);
                _.set(branch, 'address.line1', label);
                break;
            case'bank':
                _.set(branch, 'bank.id', value);
                _.set(branch, 'bank.details', label);
                break;
            case'type':
                _.set(branch, 'type.id', value);
                _.set(branch, 'type.code', label);
                break;
            default:
                break;
        }


        this.setState({branch});
    };
    //endregion

    //region Helper Methods
    mapBranchDataToViewModel = (data) => {
        return {
            id: data.id,
            details: data.details,
            address: {
                id: data.address.id,
                line1: data.address.line1
            },
            bank: {
                id: data.bank.id,
                details: data.bank.details
            },
            type: {
                id: data.type.id,
                code: data.type.code
            }
        }
    };

    mapAddressDataToSelectModel = (address) => {
        return {
            value: address.id,
            label: address.line1
        }
    };

    mapBankDataToSelectModel = (bank) => {
        return {
            value: bank.id,
            label: bank.details
        }
    };

    mapTypeDataToSelectModel = (type) => {
        return {
            value: type.id,
            label: type.code
        }
    };
    //endregion

    //region AsyncSelect Event Handlers
    filterAddressesAsync = async (input) => {
        const {data} = await addressService.getAddressesByLine1(input);
        const processedAddresses = data.items.map(x => this.mapAddressDataToSelectModel(x));
        this.setState({addresses: processedAddresses});

        return this.state.addresses.filter(a => a.label.toLowerCase().includes(input.toLowerCase()));
    };

    filterBanksAsync = async (input) => {
        const {data} = await bankService.getBanksByDetails(input);
        const processedBanks = data.items.map(x => this.mapBankDataToSelectModel(x));
        this.setState({banks: processedBanks});

        return this.state.banks.filter(a => a.label.toLowerCase().includes(input.toLowerCase()));
    };

    filterTypesAsync = async (input) => {
        const {data} = await refBranchTypeService.getRefBranchTypes();
        const processedTypes = data.map(x => this.mapTypeDataToSelectModel(x));
        this.setState({types: processedTypes});

        return this.state.types.filter(a => a.label.toLowerCase().includes(input.toLowerCase()));
    };

    addressSelectorOptions = input =>
        new Promise(resolve => {
            setTimeout(async () => {
                resolve(await this.filterAddressesAsync(input));
            }, 1000)
        });

    bankSelectorOptions = input =>
        new Promise(resolve => {
            setTimeout(async () => {
                resolve(await this.filterBanksAsync(input));
            }, 1000)
        });

    typeSelectorOptions = input =>
        new Promise(resolve => {
            setTimeout(async () => {
                resolve(await this.filterTypesAsync(input));
            }, 1000)
        });

    //endregion

    render() {
        const {details, address, bank, type} = this.state.branch;

        return (
            <React.Fragment>
                <Card title="Branch form">
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            label="Details"
                            value={details}
                            onChange={this.handleChange}
                            note="Name of the branch."
                        />
                        <AsyncSelect
                            cacheOptions
                            defaultOptions
                            value={{value: address.id, label: address.line1}}
                            onChange={this.handleSelectChange}
                            loadOptions={this.addressSelectorOptions}
                            className="react__select"
                            name="address"
                        />
                        <AsyncSelect
                            cacheOptions
                            defaultOptions
                            value={{value: bank.id, label: bank.details}}
                            onChange={this.handleSelectChange}
                            loadOptions={this.bankSelectorOptions}
                            className="react__select"
                            name="bank"
                        />
                        <AsyncSelect
                            cacheOptions
                            defaultOptions
                            value={{value: type.id, label: type.code}}
                            onChange={this.handleSelectChange}
                            loadOptions={this.typeSelectorOptions}
                            className="react__select"
                            name="type"
                        />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </Card>
            </React.Fragment>
        );
    }
}

export default BranchesForm;