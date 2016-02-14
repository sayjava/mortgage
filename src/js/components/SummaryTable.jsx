import React from 'react';

export default class SummaryTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            opened: false
        }
    }

    onToggle( ){
        this.setState({
            opened: !this.state.opened
        });
    }

    render() {

        let {mortgage, rent, values, breakEven, durationValue} = this.props;

        return (
            <div className="summary-table">
                <span className="close-btn" onClick={this.onToggle.bind(this)}>
                    {this.state.opened ? <span>Hide break down</span> : <span>Show break down</span>}
                </span>

                {this.state.opened ?
                    <div className="side-summary">
                        <table className="ui very basic table">
                            <tbody>
                            <tr>
                                <td></td>
                                <td>Mortgage</td>
                                <td>Rent</td>
                            </tr>
                            <tr>
                                <td>Initial Cost</td>
                                <td>£{(mortgage.initialCost).format(2)}</td>
                                <td>£{(rent.initialCost).format(2)}</td>
                            </tr>
                            <tr>
                                <td>Monthly Cost</td>
                                <td>£{(mortgage.monthlyPayment).format(2)}</td>
                                <td>£{(mortgage.monthlyPayment).format(2)}</td>
                            </tr>
                            <tr>
                                <td>Cash at {durationValue.year.ordinalize()} year</td>
                                <td>£{(durationValue.mortgage.netCash).format(2)}</td>
                                <td>£{(durationValue.rent.netCash).format(2)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div> : null}
            </div>
        )
    }
}