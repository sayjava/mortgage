import React from 'react';
import ReactSlider from 'react-slider';

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

    render() {
        const {defaultValue,min,max,step, desc, type, info} = this.props;

        return (
            <table className="ui very basic table">
                <tr>
                    <td className="two wide column">
                        {info}
                    </td>
                    <td className="two wide column">
                        <span className="value min">{type + min.format() + desc}</span>
                    </td>
                    <td className="ten wide column">
                        <div className="slide">
                            <ReactSlider ref="homeValuex" defaultValue={defaultValue}
                                         min={min} max={max} step={step}
                                         onChange={this.onValueChanged.bind(this)} withBars>
                                <div className="my-handle">{type + this.state.newVal.abbr(2) + desc}</div>
                            </ReactSlider>
                        </div>
                    </td>
                    <td className="two wide column">
                        <span className="value max">{type + max.format() + desc}</span>
                    </td>
                </tr>
            </table>
        )
    }
}
