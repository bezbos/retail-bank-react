import React, {Component} from 'react';
import bankService from "../services/domain/bankService";

class Banks extends Component {
    state = {
        banks: []
    };

    async componentDidMount() {
        const {data} = await bankService.getBanksRange(0);

        this.setState({banks: data.items});
    }

    render() {
        const {banks} = this.state;
        return (
            <React.Fragment>
                <ul className="list-group">
                    {banks.map(bank => <li key={bank.id} className="list-group-item">{bank.details}</li>)}
                </ul>

            </React.Fragment>
        );
    }
}

export default Banks;