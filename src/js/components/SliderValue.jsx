import React from 'react';
import ReactSlider from 'react-slider';
import Slider from 'rc-slider';

export default class SliderValue extends React.Component {

    componentWillMount() {
        this.setState({
            newVal: this.props.defaultValue
        });
    }

    onValueChanged(newVal) {
        this.setState({
            newVal
        });

        this.props.onChange(newVal);
    }

    getValue() {
        return this.state.newVal;
    }

    getMarks() {
        let {min, max, desc, type} = this.props;
        let marks = {};
        Number.range(min, max).every((max - min) / 4, function (val) {
            let value = Math.round(val);
            marks[value] = `${type}${value.abbr()}${desc}`;
        });

        return marks;
    }

    render() {
        const {defaultValue,min,max, desc, type, info} = this.props;

        function tipFormatter(val) {
            return `${type}${val.format()}${desc}`;
        }

        return (
            <div className="slider-input">
                <div className="ui grid">
                    <div className="four wide column">
                        {info}
                    </div>
                    <div className="eleven wide column">
                        <div className="slide">
                            <Slider defaultValue={defaultValue}
                                    tipFormatter={tipFormatter}
                                    min={min} max={max}
                                    marks={this.getMarks()}
                                    included={false}
                                    onChange={this.onValueChanged.bind(this)} withBars>
                                <div className="my-handle">{type + this.state.newVal.abbr(2) + desc}</div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
