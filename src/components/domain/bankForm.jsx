/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import React, {Component} from 'react';
import {toast} from 'react-toastify';
import bankService from '../../services/domain/bankService';
import exceptions from '../../utils/exceptions';
import Card from '../common/card';
import Input from '../common/input';

/**
 * @description Domain specific component for taking <b>Bank</b> related input.
 */
class BankForm extends Component {

    //region Properties
    // We check if the query string "id" is TRUTHY and it DOESN'T match to "new" to determine if the item exists.
    isExistingBank = this.props.match.params['id'] && this.props.match.params['id'] !== 'new';
    state = {
        bank: {id: '', details: ''}
    };
    //endregion

    //region Lifecycle Hooks
    async componentDidMount() {
        const {params} = this.props.match;

        if (this.isExistingBank) {
            const {data: bank} = await bankService.getBank(params['id']);
            this.setState({bank})
        }
    }

    //endregion

    //region Event Handlers
    handleSubmit = async e => {
        e.preventDefault();

        try {
            this.isExistingBank
                ? await bankService.updateBank(this.state.bank)
                : await bankService.addBank(this.state.bank);
        } catch (ex) {
            exceptions.showHttpException(ex);
            return;
        }

        this.props.history.push('/banks');

        this.isExistingBank
            ? toast.success('Updated successfully!')
            : toast.success('Added successfully!');
    };

    handleChange = ({currentTarget: input}) => {
        const bank = {...this.state.bank};
        bank[input.name] = input.value;

        this.setState({bank});
    };

    //endregion

    render() {
        return (
            <React.Fragment>
                <Card title="Bank form">
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            label="Details"
                            value={this.state.bank.details}
                            onChange={this.handleChange}
                            note="Put in the name of the bank."
                        />
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </Card>
            </React.Fragment>
        );
    }
}

export default BankForm;