import d3 from 'd3';
import c3 from 'c3';
import React from 'react';

export default class Graph extends React.Component {

    constructor(props) {
        super(props);

        this.updateChart = function (nextProps) {
            let columns = this.createColumns(nextProps);
            let breakEven = this.getBreakEvenYear(this.props);


            this.chart.load({
                columns: [columns.mortgage, columns.rent],
                regions: {'mortgage': [{start: 0, end: breakEven.year - 1, 'style': 'dashed'}]}
            });

            this.chart.regions({'mortgage': [{start: 0, end: breakEven.year - 1, 'style': 'dashed'}]});

        }.bind(this).throttle(1000);
    }

    componentWillReceiveProps(nextProps) {
        this.updateChart(nextProps);
    }

    componentDidMount() {
        let columns = this.createColumns(this.props);

        let breakEven = this.getBreakEvenYear(this.props);

        this.chart = c3.generate({
            bindto: '#chart',
            data: {
                columns: [
                    columns.mortgage,
                    columns.rent,
                    breakEven
                ],selection: {
                    grouped: true
                },
                type: 'bar',
                regions: {'mortgage': [{start: 0, end: breakEven.year - 1, 'style': 'dashed'}]}
            },
            tooltip: {
                format: {
                    title: function (x) {
                        return  (x + 1).ordinalize() + ' Year';
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
                },
                x: {
                    label: 'Years',
                    tick: {
                        format: function (d) {
                            return d + 1;
                        }
                    }
                }
            }
        });
    }

    shouldComponentUpdate() {
        return false;
    }

    createColumns(props) {
        let mortgage = props.mortgage.periods.map(p => p.netCash);
        mortgage.unshift('Mortgage');

        let rent = props.rent.periods.map(p => p.netCash);
        rent.unshift('Renting');

        return {
            mortgage,
            rent
        };
    }

    getBreakEvenYear(props) {
        let {rent, mortgage} = props;
        let rentPeriod, mortgagePeriod, year;

        for (year = 0; year < rent.periods.length; year++) {
            rentPeriod = rent.periods[year];
            mortgagePeriod = mortgage.periods[year];

            if (mortgagePeriod.netCash > rentPeriod.netCash) {
                break;
            }
        }

        return {
            rentPeriod,
            mortgagePeriod,
            year
        };
    }


    render() {
        return (

            <div id="chart">
            </div>
        )
    }
}