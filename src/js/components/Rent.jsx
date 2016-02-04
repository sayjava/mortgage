import React from 'react';
import {rent} from '../lib/mortgage/rent';

const RENT_DEFAULTS = {
    rent: 1000,
    duration: 5,
    insurance: 2,
    deposit:25000,
    investmentReturns: 4
};

export default class Rent extends React.Component {

    componentWillMount() {
        this.setState({
            rent: rent(RENT_DEFAULTS)
        });
    }

    update() {

    }

    render() {
        return (
            <div className="ui segment">
                <h3>Should I Buy Or Rent ?</h3>
                <span>COST : {this.state.rent.cost}</span>
                <span>Deposit : {this.state.rent.deposit}</span>
                <span>Investment : {this.state.rent.investment}</span>
            </div>
        )
    }
}