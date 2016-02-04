import React from 'react';
import Amortization from '../../components/Mortgage';
import Comparison from '../../components/Comparison';
export default class Home extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="calculator-content">
               <Comparison />
            </div>
        )
    }
}