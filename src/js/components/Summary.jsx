import React from 'react';

export default class Summary extends React.Component {

    render(){
        const {mortgage, values, durationValue} = this.props;

        function verdict(){

            let cashAtHand = durationValue.mortgage.netCash - durationValue.rent.netCash;

            if(cashAtHand < 0) {
                return (
                    <span className="buying">
                         you will be worse off by <span className="verdict"> £{cashAtHand.format(0)} </span>
                    </span>
                )
            } else {
                return (<span className="renting">
                    you will be better off by <span className="verdict"> £{(cashAtHand).format(0)}</span>
                </span>)
            }
        }

        return (
            <div className="summary">
                <h3 className="ui header">Summary</h3>
                <p className="text">
                    If you bought a property for <span className="value">£{values.homeValue.format(0)}</span>, paying a monthly mortgage of <span className="value"> £{Math.round(mortgage.monthlyPayment).format()} </span>
                    and sell the property after <span className="value">{values.duration} years</span>, {verdict()} compared to renting
                    a similar property.
                </p>
            </div>
        )
    }
}