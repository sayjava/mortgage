import React from 'react';
import Amortization from '../../components/Mortgage.jsx';
import Comparison from '../../components/Comparison.jsx';
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