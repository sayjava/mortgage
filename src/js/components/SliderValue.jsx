import React from 'react';
import Slider from 'rc-slider';

export default class SliderValue extends React.Component {

    componentWillMount() {
        this.setState({
            newVal: this.props.defaultValue
        });
    }

    onValueChanged(newVal) {

        setTimeout(function(){
            this.setState({
                newVal
            });
            this.props.onChange(newVal);
        }.bind(this),100)
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
        const {defaultValue,min,max, desc, type, info, meta, step} = this.props;
        const stepVar = step ? step : 1;

        function tipFormatter(val) {
            return `${type}${val.format()}${desc}`;
        }

        return (
            <div className="slider-input">
                <div className="ui grid">
                    <div className="five wide column">
                        <span className="info">{info}</span>
                        <span className="meta">{meta}</span>
                    </div>
                    <div className="ten wide column">
                        <div className="slide">
                            <Slider defaultValue={defaultValue}
                                    tipFormatter={tipFormatter}
                                    min={min} max={max}
                                    step={stepVar}
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
