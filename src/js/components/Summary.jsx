import React from 'react';

export default class Summary extends React.Component {

    render(){
        const {mortgage, rent, values} = this.props;

        function verdict(){
            let cashAtHand = mortgage.profit-rent.profit;
            if(cashAtHand < 0) {
                return (
                    <span>
                         you will be better off by <b> £{Math.abs(cashAtHand).format(0)} RENTING </b> a similar house.
                    </span>
                )
            } else {
                return (<span>
                    you will be better off by <b> £{Math.abs((cashAtHand)).format(0)} BUYING </b> the house.
                </span>)
            }
        }

        return (
            <div className="summary">
                <span className="ui header">Summary</span>
                <p className="text">
                    If you buy a house for <b>£{values.homeValue.format(0)}</b>, paying a monthly mortgage of <b> £{Math.round(mortgage.monthlyPayment).format()} </b>
                    and sell the house after <b>{values.duration} years</b>, {verdict()}
                </p>
            </div>
        )
    }
}