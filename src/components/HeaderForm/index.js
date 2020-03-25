module.exports = HeaderForm;
const React = require('react');
require('./style.less');

function HeaderForm(props) {
    React.Component.call(this, props);
    this.render = function () {
        console.log(props);
        return <form onSubmit={handleSubmit}>
            <label>{this.props.title}</label>
        </form>
    };

    function handleSubmit() {
        console.log(arguments);
    }


}

HeaderForm.prototype = Object.create(React.Component.prototype);