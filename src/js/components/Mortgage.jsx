import React from 'react';
const Finance = require('../lib/finance');

const DEFAULT_RATE = 6.75;
const DEFAULT_PRINCIPAL = 200000;
const DEFAULT_TERM = 30;

const i10nGBP = new Intl.NumberFormat("en-GB", {style: "currency", currency: "GBP"});
const i10nEN = new Intl.NumberFormat("en-GB");

export default class Amortization extends React.Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.setState({
            result: this.calculate(DEFAULT_PRINCIPAL, DEFAULT_RATE, DEFAULT_TERM),
            principal: DEFAULT_PRINCIPAL
        });
    }

    calculate(principal, rate, term) {
        return Finance.PMT((rate / 100) / 12, term * 12, -principal);
    }

    onSubmit(e) {
        e.preventDefault();

        let rate = parseFloat(this.refs.rate.value);
        let term = parseFloat(this.refs.term.value);
        let principal = parseFloat(this.state.principal);

        if (Number.isNaN(rate) || Number.isNaN(term) || Number.isNaN(principal)) {
            this.setState({
                error: 'Missing values'
            });
        } else {
            this.setState({
                result: this.calculate(principal, rate, term)
            });
        }

    }

    onMoneyEntered(e) {
        if (e.target.value.length !== 0) {
            let newVal = String(e.target.value).split(',').join('');
            this.setState({
                principal: parseFloat(newVal)
            });
        } else {
            this.setState({
                principal: ''
            });
        }
    }

    render() {
        const result = i10nGBP.format(this.state.result);
        return (
            <div className="ui segment calculator">
                <h5 className="ui header">Mortgage Calculator</h5>
                <form onSubmit={this.onSubmit.bind(this)} className="ui form">
                    <p className="field">
                        <label htmlFor="principal">Home Value</label>
                        <input ref="principal" defaultValue={i10nEN.format(this.state.principal) || ''}
                               value={i10nEN.format(this.state.principal) || ''}
                               onChange={this.onMoneyEntered.bind(this)}/>
                    </p>

                    <p className="field">
                        <label htmlFor="rate">Interest Rate (APR) %</label>
                        <input ref="rate" defaultValue={DEFAULT_RATE}/>
                    </p>

                    <p className="field">
                        <label htmlFor="Term">Loan Term (Years)</label>
                        <input ref="term" defaultValue={DEFAULT_TERM}/>
                    </p>
                    <p className="field">
                        <span className="ui toggle checkbox">
                            <input type="checkbox" name="public"/>
                            <label>Interest Only Payment</label>
                        </span>
                    </p>

                    <p className="field">
                        <input type="submit" value="Calculate" className="ui positive button"/>
                    </p>
                    <div className="ui divider"></div>
                    <span>Your monthly payment will be</span>
                    <h3>{result}</h3>
                </form>
            </div>
        )
    }
}