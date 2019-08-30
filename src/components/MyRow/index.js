module.exports = MyRow;
require('./style.less');
const React = require('react');

function MyRow(props) {
	const selectStyle = {
		color: props.selected ? "blue" : "black"
	};
	const selectedClass = props.selected? "row-selected" : "";
    const headerClass = props.isHeader? "row-header" : "";
	return (
        <div className={"MyRow " + selectedClass + headerClass} 
            onClick={props.onClick} style={selectStyle}>
		    {
                props.cells.map((cell, idx) => (
                    props.isHeader?(<div key={idx}>
                        {cell}
                        <div className="resizer"></div>
                    </div>):(<div key={idx}>
                        {cell}
                    </div>)
                ))
            }
	    </div>
    )
}
