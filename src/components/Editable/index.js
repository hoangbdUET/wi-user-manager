module.exports = Editable;
require('./style.less');
const React = require('react');
const PropTypes = require('prop-types');
Editable.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    formatValue: PropTypes.func,
    setValue: PropTypes.func,
    onValueChanged: PropTypes.func
}
function Editable(props) {
    React.Component.call(this, props);
    let value = props.value;
    let formatter = this.props.formatValue || function(v) { return v; };
    this.state = {
        editing: false,
        value: value,
        originValue: value
    }
    this.textInput = React.createRef();
    this.handleChange = handleChange.bind(this);
    function handleChange(e) {
        this.setState({
            value:e.target.value
        });
    }

    this.handleSubmit = handleSubmit.bind(this);
    function handleSubmit(event) {
        event.preventDefault();
        this.textInput.current.blur();
    }
    
    this.handleBlur = handleBlur.bind(this);
    function handleBlur(event) {
        event.preventDefault();
        this.setState((state) => {
            let setter = this.props.setValue || function(v) { return v; }
            let newVal = setter(state.value);
            if (newVal != state.originValue)
                this.props.onValueChanged && this.props.onValueChanged(newVal);
            return {
                editing:false,
                originValue: newVal,
                value: newVal
            }
        });
    }

    this.handleClick = handleClick.bind(this);
    function handleClick() {
        this.setState({editing:true});
        setTimeout(() => {
            this.textInput.current.focus();
        },500);
    }

    this.render = function() {
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
            <div className="Editable">
                <div style={this.state.editing?hiddenStyle:visibleStyle} tabIndex={0} onFocus={this.handleClick}
                    onClick={this.handleClick}>
                    {this.state.value || formatter("" + (this.state.value=== null || this.state.value === undefined)?"":this.state.value)}
                </div>
                    
                <form style={this.state.editing?visibleStyle:hiddenStyle} 
                    onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} 
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
