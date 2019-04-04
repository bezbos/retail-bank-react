/**
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0}
 * @author Boško Bezik <buddhacatmonk@gmail.com>
 */

import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';
import creditCardsImage from '../../images/credit_cards.png';
import confidenceImage from '../../images/fallout_mascot.png';
import mortgageHelpImage from '../../images/iconfinder_18_3319626.png';
import educationHatImage from '../../images/iconfinder_Education_3069198.png';
import safetyImage from '../../images/iconfinder_safety__protection__shield__privacy_2537346.png';

/**
 * @description Homepage component.
 */
class Homepage extends Component {
    render() {
        return (
            <React.Fragment>
                {/* Carousel */}
                <Card>
                    <Carousel className="bg-dark pt-2">
                        <CarouselItem>
                            <img className="d-block mb-5" src={creditCardsImage} alt="goodCreditRates" height="300px"/>
                            <Carousel.Caption>
                                <h3>Good credit rates</h3>
                                <p>We have the fairest credit rates.</p>
                            </Carousel.Caption>
                        </CarouselItem>
                        <CarouselItem>
                            <img className="d-block mb-5" src={confidenceImage} alt="weSupportYou" height="300px"/>
                            <Carousel.Caption>
                                <h3>We support you!</h3>
                                <p>We are there for you wherever and whenever!</p>
                            </Carousel.Caption>
                        </CarouselItem>
                    </Carousel>
                </Card>
                {/* /carousel */}

                {/* Services */}
                <div className="row pt-5 my-5 mt-5">
                    <div className="col-lg-4">
                        <img src={safetyImage} width="100px" height="100px" alt="securityAndPrivacy"/>
                        <h2>Security & Privacy</h2>
                        <p>Your privacy and security are at the forefront of what we do. Learn how we protect your
                            personal information and safeguard you against fraud.</p>
                        <p>
                            <button className="btn btn-secondary">Learn more »</button>
                        </p>
                    </div>
                    <div className="col-lg-4">
                        <img src={mortgageHelpImage} width="100px" height="100px" alt="mortgageHelp"/>
                        <h2>Mortgage Help</h2>
                        <p>Are financial hardships making your mortgage payments difficult to afford? You have options
                            to consider.</p>
                        <p>
                            <button className="btn btn-secondary">Learn more »</button>
                        </p>
                    </div>
                    <div className="col-lg-4">
                        <img src={educationHatImage} width="100px" height="100px" alt="financialEducation"/>
                        <h2>Financial Education</h2>
                        <p>Get valuable financial insight. We cover everything from building a budget to planning for
                            retirement.</p>
                        <p>
                            <button className="btn btn-secondary">Learn more »</button>
                        </p>
                    </div>
                </div>
                {/* /services */}

                {/* Pricing */}
                <div>
                    <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                        <h1 className="display-4">Compare Savings and Money Market Accounts</h1>
                        <p className="lead">Get the peace of mind that comes from saving for your future. Now for a
                            limited
                            time, open a new Money Market Premier Savings account with $25,000 in new funds and get one
                            of
                            the best promo rates in your area.*</p>
                    </div>
                    <div className="pt-2 card-deck text-center">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Money Market Premier Savings</h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-unstyled mb-4">
                                    <li>&#8226; 0.01% - 1.51% APY*</li>
                                    <li className="mt-2">&#8226; Depending on balance tier and meeting the $25,000 new
                                        money
                                        requirement
                                    </li>
                                    <li className="mt-2">&#8226; Annual Percentage Yield (APY) is accurate as of
                                        03/18/2019
                                    </li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-primary">View rates</button>
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Choice Money Market Savings</h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-unstyled mb-4">
                                    <li>&#8226; Annual Percentage Yield (APY)</li>
                                    <li className="mt-2">&#8226; 0.05% - 0.49% APY*</li>
                                    <li className="mt-2">&#8226; Depending on balance and checking relationship</li>
                                    <li className="mt-2">&#8226; Annual Percentage Yield (APY) is accurate as of
                                        03/18/2019
                                    </li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-primary">View rates</button>
                            </div>
                        </div>
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header">
                                <h4 className="my-0 font-weight-normal">Classic Savings</h4>
                            </div>
                            <div className="card-body">
                                <ul className="list-unstyled mb-4">
                                    <li>&#8226; 0.01% APY*</li>
                                    <li className="mt-2">&#8226; On all balances</li>
                                    <li className="mt-2">&#8226; Annual Percentage Yield (APY) is accurate as of
                                        03/18/2019
                                    </li>
                                </ul>
                                <button type="button" className="btn btn-lg btn-block btn-primary">View rates</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /pricing */}

                {/* Footer */}
                <footer className="pt-4 my-md-5 pt-md-5 border-top">
                    <div className="row">
                        <div className="col-12 col-md">
                            <small className="d-block mb-3 text-muted">© Boško Bezik
                                - {new Date().getFullYear()}</small>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Banking</h5>
                            <ul className="list-unstyled text-small">
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">Checking Accounts</button>
                                </li>
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">Savings Accounts</button>
                                </li>
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">CDs</button>
                                </li>
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">IRA CDs</button>
                                </li>
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">Online Banking</button>
                                </li>
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">Mobile Banking</button>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Credit Cards</h5>
                            <ul className="list-unstyled text-small">
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">Compare Credit Cards
                                    </button>
                                </li>
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">Cash Back Card</button>
                                </li>
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">Platinum Card</button>
                                </li>
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">Secured Card</button>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 col-md">
                            <h5>Loans</h5>
                            <ul className="list-unstyled text-small">
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">Home Equity</button>
                                </li>
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">Buying a Home</button>
                                </li>
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">Personal Loans</button>
                                </li>
                                <li>
                                    <button className="btn ml-n2 btn-sm btn-link text-muted">Lines of Credit</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
                {/* /footer */}
            </React.Fragment>
        );
    }
}

export default Homepage;