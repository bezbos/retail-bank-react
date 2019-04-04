/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

import 'bootstrap/dist/css/bootstrap.css';
import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './components/auth/loginForm';
import Logout from './components/auth/logout';
import OAuth2RedirectHandler from './components/auth/OAuth2RedirectHandler';
import RegistrationForm from './components/auth/registrationForm';
import Navbar from './components/common/navbar';
import NotFound from './components/common/notFound';
import ProtectedRoute from './components/common/protectedRoute';
import Addresses from './components/domain/addresses';
import AddressForm from './components/domain/addressForm';
import BankAccountForm from './components/domain/bankAccountForm';
import BankAccounts from './components/domain/bankAccounts';
import BankForm from './components/domain/bankForm';
import Banks from './components/domain/banks';
import Branches from './components/domain/branches';
import BranchesForm from './components/domain/branchesForm';
import CustomerForm from './components/domain/customerForm';
import Customers from './components/domain/customers';
import Homepage from './components/domain/homepage';
import TransactionForm from './components/domain/transactionForm';
import Transactions from './components/domain/transactions';
import authService from './services/authService';
import './styles/App.css';

class App extends Component {

    state = {
        user: null
    };

    componentDidMount() {
        const user = authService.getCurrentUser();
        this.setState({user});
    }


    render() {
        return (
            <React.Fragment>
                <ToastContainer/>
                <Navbar user={this.state.user}/>
                <main className="container">
                    <Switch>
                        <Route path="/banks" component={Banks}/>
                        <ProtectedRoute path="/bank/:id" component={BankForm}/>
                        <Route path="/addresses" component={Addresses}/>
                        <ProtectedRoute path="/address/:id" component={AddressForm}/>
                        <Route path="/branches" component={Branches}/>
                        <ProtectedRoute path="/branch/:id" component={BranchesForm}/>
                        <Route path="/bankAccounts" component={BankAccounts}/>
                        <ProtectedRoute path="/bankAccount/:id" component={BankAccountForm}/>
                        <Route path="/customers" component={Customers}/>
                        <ProtectedRoute path="/customer/:id" component={CustomerForm}/>
                        <ProtectedRoute path="/transactions" component={Transactions}/>
                        <ProtectedRoute path="/transaction/:id" component={TransactionForm}/>
                        <Route path="/oauth2/redirect**" component={OAuth2RedirectHandler}/>
                        <Route path="/register" component={RegistrationForm}/>
                        <Route path="/logout" component={Logout}/>
                        <Route exact path="/login" component={LoginForm}/>
                        <Route exact path="/" component={Homepage}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
