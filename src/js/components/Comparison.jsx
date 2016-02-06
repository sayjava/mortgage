import React from 'react';
import Summary from './Summary.jsx';
import {mortgage} from '../lib/mortgage/mortgage';
import {rent} from '../lib/mortgage/rent';
import SliderValue from './SliderValue.jsx';

import Sticky from 'react-sticky';

const DEFAULT = {
    homeValue: 350000,
    duration: 7,
    rent: 1000,
    insurance: 2,
    mortgageRate: 3.87,
    mortgageTerm: 30,
    downPayment: 10,
    homePriceGrowth: 3,
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
    investmentReturns: 2
};

export default class Comparison extends React.Component {

    componentWillMount() {
        this.update(DEFAULT);
    }

    update(newValue) {
        const mortgageCalc = mortgage(newValue);

        // set the rent to monthly mortgage;
        newValue.rent = mortgageCalc.monthlyPayment;
        const rentCalc = rent(newValue, mortgageCalc.initialCost);

        // update the cost here
        this.setState({
            mortgage: mortgageCalc,
            rent: rentCalc,
            values: newValue
        });
    }

    handleStickyStateChange(floating) {
        /*  this.setState({
         floating,
         });
         console.log(arguments);*/
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

        //console.log(this.state.mortgage, this.state.rent);

        const customStyleObject = {
            position: 'fixed',
            top: '0',
            left: 0,
            right: 0,
            marginLeft:'auto',
            marginRight: 'auto',
            width: '91.5%'
        };

        const defaultStyle = {
            width: '100%',
            top: '400px',
            zIndex: 1000
        }

        return (
            <div className="calculator">

                <Sticky stickyStyle={customStyleObject} style={defaultStyle} topOffset={200}
                        stickyClass="stickySummary"
                        onStickyStateChange={this.handleStickyStateChange.bind(this)}>

                    <div className="ui segment">
                        <div className="ui header">
                            The Numbers
                        </div>
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
                                <td>Monthly Cost</td>
                                <td>£{(this.state.mortgage.monthlyPayment).format(2)}</td>
                                <td>£{(this.state.mortgage.monthlyPayment).format(2)}</td>
                            </tr>
                            <tr>
                                <td>Cash</td>
                                <td>£{(this.state.mortgage.profit).format(2)}</td>
                                <td>£{(this.state.rent.profit).format(2)}</td>
                            </tr>
                            </tbody>
                        </table>
                        <Summary rent={this.state.rent} mortgage={this.state.mortgage} values={this.state.values}/>
                    </div>

                </Sticky>


                <div className="simple values">

                    <div className="field-input">
                        <div className="info">
                            <span className="ui header">Living Details</span>
                                <span className="description">
                                    How Long do you plan to stay at this location, This is very important because
                                    it will greatly affect how better off you will be at the end of the loan term.
                                </span>
                        </div>

                        <div className="ui segment">
                            <SliderValue ref="duration"
                                         defaultValue={DEFAULT.duration}
                                         info="Duration"
                                         meta="How long do you plan to stay in the house?"
                                         step={1}
                                         type=""
                                         desc=" Years"
                                         min={5} max={DEFAULT.mortgageTerm}
                                         onChange={this.onFormSubmit.bind(this)}
                            />
                        </div>
                    </div>

                    <div className="field-input">
                        <div className="info">
                            <span className="ui header">Mortgage Details</span>
                                <span className="description">
                                    For a better calculation, enter as much details as you can here.
                                </span>
                        </div>

                        <div className="ui segment">
                            <SliderValue ref="homeValue"
                                         info="Home Value"
                                         meta="Whats the price of this house"
                                         defaultValue={DEFAULT.homeValue}
                                         step={5000}
                                         desc=""
                                         min={125000} max={1000000} type="£"
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                            <SliderValue ref="mortgageTerm"
                                         info="Mortgage Term"
                                         meta="The duration of the mortgage"
                                         defaultValue={DEFAULT.mortgageTerm}
                                         step={1}
                                         desc=" years"
                                         min={10} max={30} type=""
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                            <SliderValue ref="mortgageRate"
                                         info="Rate"
                                         meta="The interest rate (APR%) quoted by the lender"
                                         defaultValue={DEFAULT.mortgageRate}
                                         step={0.01}
                                         desc="%"
                                         min={2} max={10} type=""
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                            <SliderValue ref="downPayment"
                                         info="Deposit"
                                         meta="The percentage of your deposit of the home value"
                                         defaultValue={DEFAULT.downPayment}
                                         step={1}
                                         desc="%"
                                         min={3} max={60} type=""
                                         onChange={this.onFormSubmit.bind(this)}
                            />
                        </div>
                    </div>


                    <div className="field-input">
                        <div className="info">
                            <span className="ui header">Expenses</span>
                            <span className="description">Mortgages unfortunately comes with fees</span>
                        </div>

                        <div className="ui segment">
                            <SliderValue ref="estateAgent"
                                         info="Agent Selling Fees"
                                         meta={`After living in the house for ${this.state.values.duration} years, what is the closing cost? `}
                                         defaultValue={DEFAULT.estateAgent}
                                         step={0.1}
                                         desc="%"
                                         min={1} max={10} type=""
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                            <SliderValue ref="stampDuty"
                                         info={`Stamp Duty`}
                                         meta="When you buy a house, you will pay a stamp duty tax which is a percentage of the home value"
                                         defaultValue={DEFAULT.stampDuty}
                                         step={0.1}
                                         desc="%"
                                         min={1} max={15} type=""
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                            <SliderValue ref="arrangment"
                                         info="Arragement Fees"
                                         meta="Often you will have to pay a mortgage fee to the broker"
                                         defaultValue={DEFAULT.arrangment}
                                         step={100}
                                         desc=""
                                         min={0} max={10000} type="£"
                                         onChange={this.onFormSubmit.bind(this)}
                            />


                            <SliderValue ref="maintainance"
                                         info="Home Maintenance"
                                         meta="Owning a home do costs, how much as a percentage of you home do you think
                                             you will need to for maintenance, this value is adjusted yearly with an increase of 2%
                                             of inflation"
                                         defaultValue={DEFAULT.maintainance}
                                         step={0.1}
                                         desc="%"
                                         min={1} max={10} type=""
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                        </div>
                    </div>


                    <div className="field-input">
                        <div className="info">
                            <span className="ui header">Future Assumptions</span>
                                <span className="description">
                                    A very important factor, but not the only one. Our estimate will
                                    improve as you enter more details below.
                                </span>
                        </div>
                        <div className="ui segment">
                            <SliderValue ref="homePriceGrowth"
                                         info="House Growth"
                                         meta="Every year, house prices rise in the UK, whats the growth you anticipate yearly?"
                                         defaultValue={DEFAULT.homePriceGrowth}
                                         step={0.1}
                                         desc="%"
                                         min={1} max={10} type=""
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                            <SliderValue ref="rentDeposit"
                                         defaultValue={DEFAULT.rentDeposit}
                                         info="Rent Deposit"
                                         meta="If you will be renting a similar house, what is the security deposit?"
                                         step={0.5}
                                         type="x"
                                         desc=""
                                         min={1} max={DEFAULT.rentDeposit*5}
                                         onChange={this.onFormSubmit.bind(this)}
                            />

                            <SliderValue ref="rentGrowth"
                                         info="Rental Growth"
                                         meta="How much do you anticipate your rent will rise every year?"
                                         defaultValue={DEFAULT.rentGrowth}
                                         step={0.5}
                                         desc="%"
                                         min={1} max={10} type=""
                                         onChange={this.onFormSubmit.bind(this)}/>

                            <SliderValue ref="investmentReturns"
                                         defaultValue={DEFAULT.investmentReturns}
                                         info="Investment Return"
                                         meta="If you decided to invest or save your money, whats you anticipated return on investment"
                                         step={0.1}
                                         type=""
                                         desc="%"
                                         min={1} max={100}
                                         onChange={this.onFormSubmit.bind(this)}
                            />
                        </div>
                    </div>

                </div>


            </div>
        )
    }
}