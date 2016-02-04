import React from 'react';
import Rent from './Rent';
import {mortgage} from '../lib/mortgage/mortgage';
import {rent} from '../lib/mortgage/rent';
import ReactSlider from 'react-slider';
import SliderValue from './SliderValue';

const DEFAULT = {
    homeValue: 350000,
    duration: 7,
    rent: 1000,
    insurance: 2,
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
    maintainance: 1,
    investmentReturns: 4
};

export default class Comparison extends React.Component {

    componentWillMount() {
        this.update(DEFAULT);
    }

    update(newValue) {
        const mortgageCalc = mortgage(newValue);
        const rentCalc = rent(newValue, mortgageCalc.initialCost);

        // update the cost here
        this.setState({
            mortgage: mortgageCalc,
            rent: rentCalc,
            values: newValue
        });
    }

    onFormSubmit(evt) {
        let newValue = JSON.parse(JSON.stringify(DEFAULT));
        let self = this;

        Object.keys(DEFAULT).forEach((key) => {
            if (self.refs[key]) {
                newValue[key] = parseFloat(self.refs[key].getValue());
            }
        });

        this.update(newValue);
        evt.preventDefault ? evt.preventDefault() : '';
    }

    render() {

        console.log(this.state.mortgage, this.state.rent);

        return (
            <div className="calculator">

                <div className="results">
                    <table className="ui very basic table">
                        <tbody>
                        <tr>
                            <td>In {this.state.values.duration} years</td>
                            <td>Mortgage</td>
                            <td>Rent</td>
                        </tr>
                        <tr>
                            <td>Initial Cost</td>
                            <td>£{(this.state.mortgage.initialCost).format(2)}</td>
                            <td>£{(this.state.rent.initialCost).format(2)}</td>
                        </tr>
                        <tr>
                            <td>Cash</td>
                            <td>£{(this.state.mortgage.cashAtHand).format(2)}</td>
                            <td>£{(this.state.rent.cashAtHand).format(2)}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="simple values">
                    <form className="ui form" onSubmit={this.onFormSubmit.bind(this)}>

                        <div className="field-input ui segment">
                            <div className="info">
                                <span className="ui header">Mortgage Details</span>
                                <span className="description">
                                    A very important factor, but not the only one. Our estimate will
                                    improve as you enter more details below.
                                </span>
                            </div>
                            <SliderValue ref="homeValue"
                                         info="Home Value"
                                         defaultValue={DEFAULT.homeValue}
                                         step={1000}
                                         desc=""
                                         min={125000} max={900000} type="£"
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                            <SliderValue ref="mortgageRate"
                                         info="Mortgate Rate"
                                         defaultValue={DEFAULT.mortgageRate}
                                         step={0.01}
                                         desc="%"
                                         min={2} max={10} type=""
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                            <SliderValue ref="downPayment"
                                         info="Mortgage Deposit"
                                         defaultValue={DEFAULT.downPayment}
                                         step={1}
                                         desc="%"
                                         min={5} max={60} type=""
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                        </div>

                        <div className="field-input ui segment">
                            <div className="info">
                                <span className="ui header">Rent Details</span>
                                <span className="description">
                                    How Long do you plan to stay?
                                </span>
                            </div>
                            <SliderValue ref="rent"
                                         defaultValue={DEFAULT.rent}
                                         info="Your Rent"
                                         step={50}
                                         type="£"
                                         desc=""
                                         min={950} max={DEFAULT.rent*4}
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                            <SliderValue ref="rentDeposit"
                                         defaultValue={DEFAULT.rentDeposit}
                                         info="Your Deposit"
                                         step={0.5}
                                         type="x"
                                         desc=""
                                         min={1} max={DEFAULT.rentDeposit*5}
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                            <SliderValue ref="rentGrowth"
                                         info="Rental Growth"
                                         defaultValue={DEFAULT.rentGrowth}
                                         step={0.5}
                                         desc="%"
                                         min={1} max={10} type=""
                                         onChange={this.onFormSubmit.bind(this)} />
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}