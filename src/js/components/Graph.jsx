import d3 from 'd3';
import c3 from 'c3';
import React from 'react';

export default class Graph extends React.Component {

    componentWillReceiveProps(nextProps) {
        let columns = this.createColumns(nextProps);
        this.chart.load({
            columns: [columns.capital, columns.capital]
        });
    }

    componentDidMount() {

        let columns = this.createColumns(this.props);

        this.chart = c3.generate({
            bindto: '#chart',
            data: {
                columns: [
                    columns.netCash,
                    columns.capital
                ]
            }
        });
    }

    createColumns(props) {
        let netCash = props.mortgage.periods.map(p => p.netCash);
        netCash.unshift('cash');

        let capital = props.mortgage.periods.map(p => p.remainingCapital);
        capital.unshift('capital');

        return {
            capital,
            netCash
        };
    }

    render() {
        return (
            <div>
                <h3>The Chart</h3>
                <div id="chart">

                </div>
            </div>
        )
    }
}