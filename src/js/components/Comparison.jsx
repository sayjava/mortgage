import React from 'react';
import Rent from './Rent';
import {mortgage} from '../lib/mortgage/mortgage';
import {rent} from '../lib/mortgage/rent';

const DEFAULT = {
    homeValue: 350000,
    duration: 7,
    mortgageRate: 3.87,
    mortgageTerm: 30,
    downPayment: 10,
    homePriceGrowth: 3,
    investmentRate: 4.0,
    rentGrowth: 2,
    inflation: 2,
    stampDuty: 3.2,
    estateAgent: 2.0,
    convency: 1000,
    epc: 120,
    valuation: 300,
    arrangment: 1300,
    survey:600,
    searches: 200,
    transfer: 35,
    langRegistry: 120,
    leaseHold: 90,
    rentDeposit: 2,
    maintainance: 1
};

export default class Comparison extends React.Component {

    componentWillMount() {
        this.setState({
            homeValue: DEFAULT.homeValue,
            duration: DEFAULT.duration,
            mortgage: mortgage(DEFAULT)
        });

        //console.log('MORTGAGE ----------> ', mortgage(DEFAULT));
    }

    update(newValue) {
        // update the cost here
        this.setState({
            mortgage: mortgage(newValue),
            rent: rent(newValue)
        });
    }

    onFormSubmit(evt) {
        let newValue = JSON.parse(JSON.stringify(DEFAULT));
        let self = this;

        Object.keys(DEFAULT).forEach((key) => {
            if (self.refs[key]) {
                newValue[key] = parseFloat(self.refs[key].value);
            }
        });

        this.update(newValue);
        evt.preventDefault();
    }

    render() {
        return (
            <div className="ui segment">

                <div className="simple values">
                    <form className="ui form" onSubmit={this.onFormSubmit.bind(this)}>
                        <div className="field">
                            <div>
                                <p>Home Price</p>
                            </div>
                            <div className="ui left labeled input">
                                <div className="ui label">&pound;</div>
                                <input ref="homeValue" type="text" defaultValue={DEFAULT.homeValue}
                                       onBlur={this.onFormSubmit.bind(this)}/>
                            </div>
                        </div>

                        <div className="field">
                            <div>
                                <p>How Long Do you plany to Stay</p>
                            </div>
                            <div className="ui right labeled input">
                                <input ref="duration" type="text" defaultValue={DEFAULT.duration}
                                       onBlur={this.onFormSubmit.bind(this)}/>
                                <div className="ui basic label">Years</div>
                            </div>
                        </div>

                        <div>
                            <h4>Mortgage Details</h4>

                            <div className="field">
                                <span>Mortage Rate</span>
                                <div className="ui right labeled input">
                                    <input ref="mortgageRate" type="text" defaultValue={DEFAULT.mortgageRate}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                    <div className="ui basic label">%</div>
                                </div>
                            </div>

                            <div className="field">
                                <span>Down Payment</span>
                                <div className="ui right labeled input">
                                    <input ref="downPayment" type="text" defaultValue={DEFAULT.downPayment}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                    <div className="ui basic label">%</div>
                                </div>
                            </div>

                            <div className="field">
                                <span>Mortgage Term</span>
                                <div className="ui right labeled input">
                                    <input ref="mortgageTerm" type="text" defaultValue={DEFAULT.mortgageTerm}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                    <div className="ui basic label">%</div>
                                </div>
                            </div>

                        </div>

                        <div>
                            <h4>Future</h4>

                            <div className="field">
                                <space>Home Value Growth</space>
                                <div className="ui right labeled input">
                                    <input ref="homePriceGrowth" type="text" defaultValue={DEFAULT.homePriceGrowth}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                    <div className="ui basic label">%</div>
                                </div>
                            </div>

                            <div className="field">
                                <span>Rental Growth</span>
                                <div className="ui right labeled input">
                                    <input ref="rentGrowth" type="text" defaultValue={DEFAULT.rentGrowth}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                    <div className="ui basic label">%</div>
                                </div>
                            </div>

                            <div className="field">
                                <span>Inflation</span>
                                <div className="ui right labeled input">
                                    <input ref="inflation" type="text" defaultValue={DEFAULT.inflation}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                    <div className="ui basic label">%</div>
                                </div>
                            </div>

                            <div className="field">
                                <span>Investment Rate</span>
                                <div className="ui right labeled input">
                                    <input ref="inflation" type="text" defaultValue={DEFAULT.investmentRate}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                    <div className="ui basic label">%</div>
                                </div>
                            </div>

                        </div>

                        <div>
                            <h4>Expenses</h4>
                            <div className="field">
                                <span>Stamp Duty</span>
                                <div className="ui right labeled input">
                                    <input ref="stampDuty" type="text" defaultValue={DEFAULT.stampDuty}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                    <div className="ui basic label">%</div>
                                </div>
                            </div>

                            <div className="field">
                                <span>Selling Estate Fees</span>
                                <div className="ui right labeled input">
                                    <input ref="estateAgent" type="text" defaultValue={DEFAULT.estateAgent}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                    <div className="ui basic label">%</div>
                                </div>
                            </div>

                            <div className="field">
                                <span>Land Registry</span>
                                <div className="ui right labeled input">
                                    <input ref="langRegistry" type="text" defaultValue={DEFAULT.langRegistry}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                    <div className="ui basic label">%</div>
                                </div>
                            </div>

                            <div className="field">
                                <span>Mortgage Fees</span>
                                <div className="ui right labeled input">
                                    <input ref="arrangement" type="text" defaultValue={DEFAULT.arrangment}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                    <div className="ui basic label">%</div>
                                </div>
                            </div>

                            <div className="field">
                                <span>Maintainance</span>
                                <div className="ui right labeled input">
                                    <input ref="maintainance" type="text" defaultValue={DEFAULT.maintainance}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                    <div className="ui basic label">%</div>
                                </div>
                            </div>

                        </div>

                        <input type="submit"/>

                    </form>
                </div>

                <div>
                    <Rent />
                </div>
            </div>
        )
    }
}