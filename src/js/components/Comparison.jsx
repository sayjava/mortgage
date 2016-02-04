import React from 'react';
import Rent from './Rent';
import {mortgage} from '../lib/mortgage/mortgage';
import {rent} from '../lib/mortgage/rent';
import ReactSlider from 'react-slider';

const i10nEN = new Intl.NumberFormat("en-GB");

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
    survey: 600,
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
            mortgage: mortgage(DEFAULT),
            values: DEFAULT
        });
    }

    update(newValue) {
        // update the cost here
        this.setState({
            mortgage: mortgage(newValue),
            rent: rent(newValue),
            values: newValue
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

        newValue.homeValue = this.refs.homeValuex.getValue();

        this.update(newValue);

        evt.preventDefault ? evt.preventDefault() : '';
    }

    render() {

        //TODO fix this mess
        function renderTcikers(min, max, step) {

            let values = Number.range(min, max).every(step);
            let percent = 100 / values.length;

            console.log('PERCENT', percent, values.length, values);

            return values.map(function (v, index) {
                let style = {
                    padding: `0 ${(percent) / 4}%`
                };
                return (
                    <span className="ticker" style={style}>
                       <span className="value">{v.abbr()}</span>
                       <span className="line"></span>
                   </span>
                )
            })
        }

        return (
            <div className="calculator">
                <div className="simple values">
                    <form className="ui form" onSubmit={this.onFormSubmit.bind(this)}>

                        <h4>Mortgage Details</h4>

                        <div className="two fields">
                            <div className="field value-input">
                                <div className="header">
                                    <p>Home Price</p>
                                </div>
                                <div className="ui left labeled input">
                                    <div className="ui basic label">&pound;</div>
                                    <input ref="homeValue" type="text" defaultValue={i10nEN.format(DEFAULT.homeValue)}
                                           onBlur={this.onFormSubmit.bind(this)}/>
                                </div>
                            </div>
                        </div>

                        <div className="field-input">
                            <div className="info">
                                <span className="ui header">Home Price</span>
                                <span className="description">
                                    A very important factor, but not the only one. Our estimate will
                                    improve as you enter more details below.
                                </span>
                            </div>
                            <div className="ui grid">
                                <div className="two wide column">
                                    <span className="value min">£{(125000).abbr()}</span>
                                </div>
                                <div className="twelve wide column">
                                    <div className="slide">
                                        <ReactSlider ref="homeValuex" defaultValue={DEFAULT.homeValue}
                                                     min={100000} max={900000} step={1000}
                                                     onChange={this.onFormSubmit.bind(this)} withBars>
                                            <div className="my-handle">{this.state.values.homeValue.abbr()}</div>
                                        </ReactSlider>
                                    </div>
                                </div>
                                <div className="two wide column">
                                    <span className="value max">£{(900000).abbr()}</span>
                                </div>
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
                    <div className="breakdown">

                    </div>
                </div>
            </div>
        )
    }
}