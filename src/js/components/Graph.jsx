import d3 from 'd3';
import c3 from 'c3';
import React from 'react';

export default class Graph extends React.Component {

    constructor(props) {
        super(props);

        this.updateChart = function (nextProps) {
            let columns = this.createColumns(nextProps);
            this.chart.load({
                columns: [columns.mortgage, columns.rent]
            });
        }.bind(this).throttle(1000);

    }

    componentWillReceiveProps(nextProps) {
        this.updateChart(nextProps);
    }

    componentDidMount() {
        let columns = this.createColumns(this.props);

        this.chart = c3.generate({
            bindto: '#chart',
            data: {
                columns: [
                    columns.mortgage,
                    columns.rent
                ]
            },
            tooltip: {
                format: {
                    title: function (x) {
                        return 'Year ' + (x + 1);
                    },
                    value: function (value) {
                        return '£' + Math.round(value).format();
                    }
                }
            },
            axis: {
                y: {
                    label: 'Net Worth',
                    tick: {
                        format: function (d) {
                            return '£' + d.format();
                        }
                    }
                }
            }
        });

        window.chart = this.chart;
    }

    shouldComponentUpdate() {
        return false;
    }


    createColumns(props) {
        let mortgage = props.mortgage.periods.map(p => p.netCash);
        mortgage.unshift('mortgage');

        let rent = props.rent.periods.map(p => p.netCash);
        rent.unshift('rent');

        return {
            mortgage,
            rent
        };
    }


    render() {
        return (

            <div id="chart">
            </div>
        )
    }
}