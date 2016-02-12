import React from 'react';
import Summary from './Summary.jsx';
import {mortgage} from '../lib/mortgage/mortgage';
import {rent} from '../lib/mortgage/rent';
import SliderValue from './SliderValue.jsx';
import Graph from './Graph.jsx';

import Sticky from 'react-sticky';

const DEFAULT = {
    homeValue: 350000,
    duration: 10,
    rent: 1000,
    insurance: 2,
    mortgageRate: 3.87,
    mortgageTerm: 30,
    downPayment: 10,
    homePriceGrowth: 2.4,
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
    investmentReturns: 5.8
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
                newValue[key] = (self.refs[key].getValue());
            }
        });

        this.update(newValue);
        evt.preventDefault ? evt.preventDefault() : '';
    }

    getBreakEvenYear(props) {
        let {rent, mortgage} = props;
        let rentPeriod, mortgagePeriod, year;

        for (year = 0; year < rent.periods.length; year++) {
            rentPeriod = rent.periods[year];
            mortgagePeriod = mortgage.periods[year];

            if (mortgagePeriod.netCash > rentPeriod.netCash) {
                break;
            }
        }

        return {
            rentPeriod,
            mortgagePeriod,
            year
        };
    }

    render() {

        //console.log(this.state.mortgage, this.state.rent);
        let {mortgage,rent,values} = this.state;

        const customStyleObject = {
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: 1000,
            width:'100%'
        };

        const defaultStyle = {
            position: 'absolute',
            width: '100%',
            top: '0px',
            zIndex: 1000
        };

        return (
            <div className="calculator">


                    <Sticky stickyStyle={customStyleObject} topOffset={0}>
                        <div className="ui container chart-container">
                            <div className="ui segment content">
                                <Graph mortgage={mortgage} rent={rent} duration={values.duration}/>
                                <div>
                                    <h5>The summary</h5>
                                </div>
                            </div>
                        </div>
                    </Sticky>


                <div className="ui container">
                    <div className="adjustments">

                        <div className="field-input">
                            <div className="info">
                                <span className="ui header">Living Details</span>
                                <span className="description">
                                    How Long do you plan to stay at this house, This is very important because
                                    it will greatly affect how better off when you decide to trade the house for a new one or move on.
                                </span>
                            </div>

                            <div className="ui segment">
                                <SliderValue ref="duration"
                                             defaultValue={DEFAULT.duration}
                                             info={`Duration of stay ${values.duration} years`}
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
                                    For a better calculation, adjust the values as accurate as possible.
                                </span>
                            </div>

                            <div className="ui segment">
                                <SliderValue ref="homeValue"
                                             info={`Home Value at £${values.homeValue.abbr()}`}
                                             meta="Whats is the current advertised price of this house?"
                                             defaultValue={DEFAULT.homeValue}
                                             step={5000}
                                             desc=""
                                             min={125000} max={1000000} type="£"
                                             onChange={this.onFormSubmit.bind(this)}
                                />

                                <SliderValue ref="mortgageTerm"
                                             info={`Mortgage Term of ${values.mortgageTerm} years`}
                                             meta="How long is the mortgage for?"
                                             defaultValue={DEFAULT.mortgageTerm}
                                             step={1}
                                             desc=" years"
                                             min={10} max={30} type=""
                                             onChange={this.onFormSubmit.bind(this)}
                                />

                                <SliderValue ref="mortgageRate"
                                             info={`Interest Rate APR at ${values.mortgageRate}%`}
                                             meta="What is the interest rate (APR%) quoted by the lender for the loan? You should strive to get a low as possible rate"
                                             defaultValue={DEFAULT.mortgageRate}
                                             step={0.01}
                                             desc="%"
                                             min={2} max={10} type=""
                                             onChange={this.onFormSubmit.bind(this)}
                                />

                                <SliderValue ref="downPayment"
                                             info={`Deposit of £${mortgage.initialDeposit.abbr()}`}
                                             meta="How much is your deposit towards the house?"
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
                                <span className="description">Owning a house comes with expenses, these expenses
                                    are factored into the overall cost during the duration of your stay at your house.
                                </span>
                            </div>

                            <div className="ui segment">
                                <SliderValue ref="estateAgent"
                                             info={`Selling Agent Fees at ${values.estateAgent}%`}
                                             meta={`After living in the house for ${this.state.values.duration} years, when selling the house, agents will charge a percentage of the new home value`}
                                             defaultValue={DEFAULT.estateAgent}
                                             step={0.1}
                                             desc="%"
                                             min={1} max={10} type=""
                                             onChange={this.onFormSubmit.bind(this)}
                                />

                                <SliderValue ref="stampDuty"
                                             info={`Stamp Duty at £${mortgage.stampValue.abbr()}`}
                                             meta="When you buy a house in the UK, you will have to pay a stamp duty tax which is a percentage of the property value"
                                             defaultValue={DEFAULT.stampDuty}
                                             step={0.1}
                                             desc="%"
                                             min={0} max={15} type=""
                                             onChange={this.onFormSubmit.bind(this)}
                                />

                                <SliderValue ref="arrangment"
                                             info={`Mortgage Arragement Fees £${values.arrangment.abbr()}`}
                                             meta="Sometimes you will have to pay a mortgage fee to the broker"
                                             defaultValue={DEFAULT.arrangment}
                                             step={100}
                                             desc=""
                                             min={0} max={10000} type="£"
                                             onChange={this.onFormSubmit.bind(this)}
                                />


                                <SliderValue ref="maintainance"
                                             info={`Home Maintenance at ${values.maintainance}%`}
                                             meta="How much as a percentage of your home do you think
                                             you will need for maintenance, this value is adjusted yearly with an increase of 2%
                                             for inflation"
                                             defaultValue={DEFAULT.maintainance}
                                             step={0.5}
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
                                    Here you can make some simple future assumptions about property price growth, investments, rental growth e.t.c.
                                </span>
                            </div>
                            <div className="ui segment">
                                <SliderValue ref="homePriceGrowth"
                                             info={`Property Growth at ${values.homePriceGrowth}%`}
                                             meta="Property prices tend to rise in the UK, what is your anticipated rate?"
                                             defaultValue={DEFAULT.homePriceGrowth}
                                             step={0.5}
                                             desc="%"
                                             min={1} max={10} type=""
                                             onChange={this.onFormSubmit.bind(this)}
                                />

                                <SliderValue ref="rentDeposit"
                                             defaultValue={DEFAULT.rentDeposit}
                                             info={`Rent Deposit at ${values.rentDeposit} x £${mortgage.monthlyPayment.abbr()}`}
                                             meta="If you will be renting a similar house, what is the security deposit?"
                                             step={0.5}
                                             type="x"
                                             desc=""
                                             min={1} max={DEFAULT.rentDeposit*5}
                                             onChange={this.onFormSubmit.bind(this)}
                                />

                                <SliderValue ref="rentGrowth"
                                             info={`Rental Growth at ${values.rentGrowth}%`}
                                             meta="How much do you anticipate your rent will rise every year for a similar year?"
                                             defaultValue={DEFAULT.rentGrowth}
                                             step={0.5}
                                             desc="%"
                                             min={1} max={10} type=""
                                             onChange={this.onFormSubmit.bind(this)}/>

                                <SliderValue ref="investmentReturns"
                                             defaultValue={DEFAULT.investmentReturns}
                                             info={`Investment Return at ${values.investmentReturns}%`}
                                             meta="If you decided to invest or save your deposit money, what is you anticipated return on investment/savings"
                                             step={0.5}
                                             type=""
                                             desc="%"
                                             min={1} max={100}
                                             onChange={this.onFormSubmit.bind(this)}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                {/*<div className="four wide column">
                 <Sticky stickyStyle={customStyleObject} style={defaultStyle} topOffset={-550}
                 stickyClass="stickySummary"
                 onStickyStateChange={this.handleStickyStateChange.bind(this)}>

                 <div className="side-summary ui segment">
                 <div className="ui header">
                 After <b>{this.state.values.duration}</b> Years
                 </div>
                 <table className="ui very basic table">
                 <tbody>
                 <tr>
                 <td></td>
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
                 </div>*/}


            </div>
        )
    }
}