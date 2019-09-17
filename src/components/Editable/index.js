module.exports = Editable;
require('./style.less');
const React = require('react');
const PropTypes = require('prop-types');
Editable.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    formatValue: PropTypes.func,
    setValue: PropTypes.func,
    onValueChanged: PropTypes.func,
    disabled: PropTypes.bool
}

function evaluate(v) {
    if (typeof v === 'function') {
        return v();
    }
    return v;
}

function Editable(props) {
    React.Component.call(this, props);
    let formatter = this.props.formatValue || function (v) {
        return v;
    };
    this.state = {
        editing: false,
        value: evaluate(props.value)
        // originValue: value
    }
    this.textInput = React.createRef();
    this.handleChange = handleChange.bind(this);

    function handleChange(e) {
        if (this.props.disabled) return;
        // this.setState({
        //     value: e.target.value
        // });
        this.props.onValueChanged(e.target.value);
    }

    this.handleSubmit = handleSubmit.bind(this);

    function handleSubmit(event) {
        if (this.props.disabled) return;
        event.preventDefault();
        this.textInput.current.blur();
    }

    this.handleBlur = handleBlur.bind(this);

    function handleBlur(event) {
        if (this.props.disabled) return;
        event.preventDefault();
        this.setState((state) => {
            let setter = this.props.setValue || function (v) {
                return v;
            }
            let newVal = setter(state.value);
            // if (newVal != evaluate(props.value))
            //     this.props.onValueChanged && this.props.onValueChanged(newVal);
            return {
                editing: false,
                originValue: newVal,
                value: newVal
            }
        });
    }

    this.handleClick = handleClick.bind(this);

    function handleClick() {
        if (this.props.disabled) return;
        this.setState({editing: true});
        setTimeout(() => {
            this.textInput.current.focus();
        }, 300);
    }

    this.render = function () {
        const commonStyle = {
            width: '100%',
            height: '100%'
        }
        const visibleStyle = Object.assign({
            display: 'block'
        }, commonStyle);

        const hiddenStyle = Object.assign({
            display: 'none'
        }, commonStyle);
        const jsxElem = (
            <div className="Editable" onFocus={this.handleClick} tabIndex={0}>
                <div className="editable-value" style={this.state.editing ? hiddenStyle : visibleStyle} tabIndex={0}
                     onClick={this.handleClick}>
                    {formatter(this.props.value)}
                </div>

                <form style={this.state.editing ? visibleStyle : hiddenStyle}
                      onSubmit={this.handleSubmit}>
                    <input type="text" value={this.props.value} 
                           ref={this.textInput}
                           onChange={this.handleChange}
                           onBlur={this.handleBlur}/>
                </form>
            </div>
        )
        return jsxElem;
    }
}

Editable.prototype = Object.create(React.Component.prototype);
