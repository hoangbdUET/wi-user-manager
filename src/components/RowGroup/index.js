module.exports = RowGroup;
require('./style.less');
const React = require('react');
const MyRow = require('../MyRow');
function RowGroup(props) {
	let idx = props.idx + 1;
	return (
		<MyRow className="RowGroup" onClick={props.onClick}
	        cells={[
                isNaN(idx)?"":idx, 
                props.item.name, 
                props.item.description,
                props.item.company 
            ]}
            colWidths={props.colWidths}
            onColWidthChanged={props.onColWidthChanged}
            selected={props.selected} isHeader={props.isHeader} onCellClicked={props.onCellClicked}/>
	)
}
