/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */
import React, {Component} from 'react';
import {toast} from 'react-toastify';
import addressService from '../../services/domain/addressService';
import exceptions from '../../utils/exceptions';
import Card from '../common/card';
import Input from '../common/input';

/**
 * @description Domain specific component for taking <b>Address</b> related input.
 */
class AddressForm extends Component {

    //region Properties
    // We check if the query string "id" is TRUTHY and it DOESN'T match to "new" to determine if the item exists.
    isExistingAddress = this.props.match.params['id'] && this.props.match.params['id'] !== 'new';
    state = {
        address: {
            id: '',
            line1: '',
            line2: '',
            zipPostcode: '',
            stateProvinceCountry: '',
            country: '',
            otherDetails: ''
        }
    };
    //endregion

    //region Lifecycle Hooks
    async componentDidMount() {
        const {params} = this.props.match;

        if (this.isExistingAddress) {
            const {data: address} = await addressService.getAddress(params['id']);
            this.setState({address})
        }
    }

    //endregion

    //region Event Handlers
    handleSubmit = async e => {
        e.preventDefault();

        try {
            this.isExistingAddress
                ? await addressService.updateAddress(this.state.address)
                : await addressService.addAddress(this.state.address);
        } catch (ex) {
            exceptions.showHttpException(ex);
            return;
        }

        this.props.history.push('/addresses');

        this.isExistingAddress
            ? toast.success('Updated successfully!')
            : toast.success('Added successfully!');
    };

    handleChange = ({currentTarget: input}) => {
        const address = {...this.state.address};
        address[input.name] = input.value;

        this.setState({address});
    };

    //endregion

    render() {
        return (
            <React.Fragment>
                <Card title="Address form">
                    <form onSubmit={this.handleSubmit}>
                        <Input
                            label="Line 1"
                            value={this.state.address.line1}
                            onChange={this.handleChange}
                        />
                        <Input
                            label="Line 2"
                            value={this.state.address.line2}
                            onChange={this.handleChange}
                        />
                        <Input
                            label="Zip Postcode"
                            value={this.state.address.zipPostcode}
                            onChange={this.handleChange}
                        />
                        <Input
                            label="State Province Country"
                            value={this.state.address.stateProvinceCountry}
                            onChange={this.handleChange}
                        />
                        <Input
                            label="Country"
                            value={this.state.address.country}
                            onChange={this.handleChange}
                        />
                        <Input
                            label="Other Details"
                            value={this.state.address.otherDetails}
                            onChange={this.handleChange}
                        />

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </Card>
            </React.Fragment>
        );
    }
}

export default AddressForm;