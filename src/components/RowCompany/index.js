module.exports = RowCompany;
require('./style.less');
const React = require('react');
const MyRow = require('../MyRow');
function RowCompany(props) {
	return (
		<MyRow onClick={props.onClick}
	       cells={[props.idx + 1, props.item.name, props.item.location, props.item.licenses, props.item.description]}
	       selected={props.selected} isHeader={props.isHeader}/>
	)
}
