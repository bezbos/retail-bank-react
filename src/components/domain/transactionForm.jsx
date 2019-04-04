/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import _ from 'lodash';
import React, {Component} from 'react';
import {toast} from 'react-toastify';
import bankAccountService from '../../services/domain/bankAccountService';
import merchantService from '../../services/domain/merchantService';
import refTransactionTypeService from '../../services/domain/refTransactionTypeService';
import transactionService from '../../services/domain/transactionService';
import exceptions from '../../utils/exceptions';
import AsyncSelectLabeled from '../common/asyncSelectLabeled';
import Card from '../common/card';
import Input from '../common/input';

/**
 * @description Domain specific component for taking <b>Bank</b> related input.
 */
class TransactionForm extends Component {

    //region Properties
    // We check if the query string "id" is TRUTHY and it DOESN'T match to "new" to determine if the item exists.
    isExistingTransaction = this.props.match.params['id'] && this.props.match.params['id'] !== 'new';
    state = {
        transaction: {
            id: '',
            senderAccount: {
                id: '',
                details: ''
            },
            receiverAccount: {
                id: '',
                details: ''
            },
            merchant: {
                id: '',
                details: ''
            },
            type: {
                id: '',
                code: ''
            },
            amount: '',
            details: ''
        },
        senders: [],
        receivers: [],
        merchants: [],
        types: []
    };
    //endregion

    //region Lifecycle Hooks
    async componentDidMount() {
        const {params} = this.props.match;

        if (this.isExistingTransaction) {
            const {data: transaction} = await transactionService.getTransaction(params['id']);
            this.setState({transaction})
        }
    }

    //endregion

    //region Event Handlers
    handleSubmit = async e => {
        e.preventDefault();

        try {
            !this.isExistingTransaction && await transactionService.createPayment(this.state.transaction);
        } catch (ex) {
            exceptions.showHttpException(ex);
            return;
        }

        this.props.history.push('/transactions');

        this.isExistingBank && toast.success('Added successfully!');
    };

    handleChange = ({currentTarget: input}) => {
        const transaction = {...this.state.transaction};
        transaction[input.name] = input.value;

        this.setState({transaction});
    };

    handleSelectChange = ({value, label}, {name: inputName}) => {
        const transaction = {...this.state.transaction};

        switch (inputName) {
            case 'senderAccount':
                _.set(transaction, 'senderAccount.id', value);
                _.set(transaction, 'senderAccount.details', label);
                break;
            case'receiverAccount':
                _.set(transaction, 'receiverAccount.id', value);
                _.set(transaction, 'receiverAccount.details', label);
                break;
            case'merchant':
                _.set(transaction, 'merchant.id', value);
                _.set(transaction, 'merchant.details', label);
                break;
            case'type':
                _.set(transaction, 'type.id', value);
                _.set(transaction, 'type.code', label);
                break;
            default:
                break;
        }


        this.setState({branch: transaction});
    };
    //endregion

    //region Helper Methods
    mapTransactionDataToViewModel = (data) => {
        return {
            id: data.id,
            senderAccount: {
                id: data.senderAccount.id,
                details: data.senderAccount.details
            },
            receiverAccount: {
                id: data.receiverAccount.id,
                details: data.receiverAccount.details
            },
            merchant: {
                id: data.merchant.id,
                details: data.merchant.details
            },
            type: {
                id: data.type.id,
                code: data.type.code
            }
        }
    };

    mapSenderDataToSelectModel = (sender) => {
        return {
            value: sender.id,
            label: sender.details
        }
    };

    mapReceiverDataToSelectModel = (receiver) => {
        return {
            value: receiver.id,
            label: receiver.details
        }
    };

    mapMerchantDataToSelectModel = (merchant) => {
        return {
            value: merchant.id,
            label: merchant.details
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
    filterSendersAsync = async (input) => {
        const {data} = await bankAccountService.getBankAccountsByDetails(input);
        const processedAccounts = data.items.map(x => this.mapSenderDataToSelectModel(x));
        this.setState({senders: processedAccounts});

        return this.state.senders.filter(a => a.label.toLowerCase().includes(input.toLowerCase()));
    };

    filterReceiversAsync = async (input) => {
        const {data} = await bankAccountService.getBankAccountsByDetails(input);
        const processedAccounts = data.items.map(x => this.mapReceiverDataToSelectModel(x));
        this.setState({receivers: processedAccounts});

        return this.state.receivers.filter(a => a.label.toLowerCase().includes(input.toLowerCase()));
    };

    filterMerchantsAsync = async (input) => {
        const {data} = await merchantService.getMerchantsByDetails(input);
        const processedMerchants = data.items.map(x => this.mapMerchantDataToSelectModel(x));
        this.setState({merchants: processedMerchants});

        return this.state.merchants.filter(a => a.label.toLowerCase().includes(input.toLowerCase()));
    };

    filterTypesAsync = async (input) => {
        const {data} = await refTransactionTypeService.getRefTransactionTypes();
        const processedTypes = data.map(x => this.mapTypeDataToSelectModel(x));
        this.setState({types: processedTypes});

        return this.state.types.filter(a => a.label.toLowerCase().includes(input.toLowerCase()));
    };

    senderSelectorOptions = input =>
        new Promise(resolve => {
            setTimeout(async () => {
                resolve(await this.filterSendersAsync(input));
            }, 1000)
        });

    receiverSelectorOptions = input =>
        new Promise(resolve => {
            setTimeout(async () => {
                resolve(await this.filterReceiversAsync(input));
            }, 1000)
        });

    merchantSelectorOptions = input =>
        new Promise(resolve => {
            setTimeout(async () => {
                resolve(await this.filterMerchantsAsync(input));
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
        const {senderAccount, receiverAccount, merchant, type, amount, details} = this.state.transaction;

        return (
            <React.Fragment>
                <Card title="Payment form">
                    <form onSubmit={this.handleSubmit}>
                        <AsyncSelectLabeled
                            cacheOptions
                            defaultOptions
                            value={{value: senderAccount.id, label: senderAccount.details}}
                            onChange={this.handleSelectChange}
                            loadOptions={this.senderSelectorOptions}
                            className="react__select"
                            name="senderAccount"
                            label="Sender"
                        />
                        <AsyncSelectLabeled
                            cacheOptions
                            defaultOptions
                            value={{value: receiverAccount.id, label: receiverAccount.details}}
                            onChange={this.handleSelectChange}
                            loadOptions={this.receiverSelectorOptions}
                            className="react__select"
                            name="receiverAccount"
                            label="Receiver"
                        />
                        <AsyncSelectLabeled
                            cacheOptions
                            defaultOptions
                            value={{value: merchant.id, label: merchant.details}}
                            onChange={this.handleSelectChange}
                            loadOptions={this.merchantSelectorOptions}
                            className="react__select"
                            name="merchant"
                            label="Merchant"
                        />
                        <AsyncSelectLabeled
                            cacheOptions
                            defaultOptions
                            value={{value: type.id, label: type.code}}
                            onChange={this.handleSelectChange}
                            loadOptions={this.typeSelectorOptions}
                            className="react__select"
                            name="type"
                            label="Transaction Type"
                        />
                        <Input
                            label="Amount"
                            value={amount}
                            onChange={this.handleChange}
                        />
                        <Input
                            label="Details"
                            value={details}
                            onChange={this.handleChange}
                        />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </Card>
            </React.Fragment>
        );
    }
}

export default TransactionForm;