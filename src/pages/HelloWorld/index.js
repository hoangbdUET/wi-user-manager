module.exports = HelloWorld;
require('./style.less')
const React = require('react');

function HelloWorld(props) {
    let name = props.name || "Guest"
    return <h3 className="HelloWorld">Hello {name}</h3>
}