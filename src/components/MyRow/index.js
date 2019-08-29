module.exports = MyRow;
require('./style.less');
const React = require('react');

function MyRow(props) {
	const selectStyle = {
		color: props.selected ? "blue" : "black"
	};
	const selectedClass = props.selected? "row-selected" : "";
	return (<div className={"MyRow " + selectedClass} onClick={props.onClick} style={selectStyle}>
		{props.cells.map((cell, idx) => (<div key={idx}>{cell}</div>))}
	</div>)
}