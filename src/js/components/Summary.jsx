import React from 'react';

export default class Summary extends React.Component {

    render(){
        const {mortgage, rent, values, breakEven} = this.props;

        function verdict(){
            let cashAtHand = breakEven.mortgagePeriod.netCash - breakEven.rentPeriod.netCash;
            if(cashAtHand < 0) {
                return (
                    <span className="buying">
                         you will be better off by <span className="verdict"> £{Math.abs(cashAtHand).format(0)} RENTING </span> a similar house.
                    </span>
                )
            } else {
                return (<span className="renting">
                    you will be better off by <span className="verdict"> £{Math.abs((cashAtHand)).format(0)} BUYING </span>.
                </span>)
            }
        }

        return (
            <div className="summary">
                <h3 className="ui header">Summary</h3>
                <p className="text">
                    If you buy a house for <span className="value">£{values.homeValue.format(0)}</span>, paying a monthly mortgage of <b> £{Math.round(mortgage.monthlyPayment).format()} </b>
                    and sell the house after <span className="value">{values.duration} years</span>, {verdict()}
                </p>
            </div>
        )
    }
}