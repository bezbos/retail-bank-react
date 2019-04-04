/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

import {
    faAddressBook,
    faCodeBranch,
    faExchangeAlt,
    faIdCard,
    faUniversity,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

/**
 * @description Navigation bar component.
 */
class Navbar extends Component {
    render() {
        const {user} = this.props;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">Retailbank</NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">

                        {/* DOMAIN(ADMIN) */}
                        <NavLink to="/banks" className="nav-item nav-link">
                            <FontAwesomeIcon icon={faUniversity}/> Banks
                        </NavLink>
                        <NavLink to="/addresses" className="nav-item nav-link">
                            <FontAwesomeIcon icon={faAddressBook}/> Addresses
                        </NavLink>
                        <NavLink to="/branches" className="nav-item nav-link">
                            <FontAwesomeIcon icon={faCodeBranch}/> Branches
                        </NavLink>
                        <NavLink to="/bankAccounts" className="nav-item nav-link">
                            <FontAwesomeIcon icon={faIdCard}/> Accounts
                        </NavLink>
                        <NavLink to="/customers" className="nav-item nav-link">
                            <FontAwesomeIcon icon={faUsers}/> Customers
                        </NavLink>
                        {user &&
                        (user.roles ? user.roles.includes('ROLE_ADMIN') : false) &&
                        <NavLink to="/transactions" className="nav-item nav-link">
                            <FontAwesomeIcon icon={faExchangeAlt}/> Transactions
                        </NavLink>}
                        {/* /domain(admin) */}

                        {/* USER & AUTH */}
                        {!user &&
                        <React.Fragment>
                            <NavLink to="/login" className="nav-item nav-link">
                                Login
                            </NavLink>
                            <NavLink to="/register" className="nav-item nav-link">
                                Register
                            </NavLink>
                        </React.Fragment>
                        }
                        {user &&
                        <React.Fragment>
                            <NavLink to="/profile" className="nav-item nav-link">
                                {user.email}
                            </NavLink>
                            <NavLink to="/logout" className="nav-item nav-link">
                                Logout
                            </NavLink>
                        </React.Fragment>
                        }
                        {/* /user & auth */}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;