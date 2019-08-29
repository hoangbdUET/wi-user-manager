module.exports = GoodbyeWorld;
require('./style.less')
const React = require('react');
function GoodbyeWorld(props) {
	let name = props.name || "Guest"
	return <h3 className="GoodbyeWorld">Goodbye {name}</h3>
}