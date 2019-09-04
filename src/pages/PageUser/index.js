module.exports = PageUser;
require('./style.less');
const React = require('react');

function PageUser(props) {
    React.Component.call(this, props);
    this.state = {}
    this.render = function () {
        return <h3>MyUser</h3>
    };
}

PageUser.prototype = Object.create(React.Component.prototype);