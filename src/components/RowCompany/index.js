module.exports = RowCompany;
require('./style.less');
const React = require('react');
const MyRow = require('../MyRow');

function RowCompany(props) {
    let idx = props.idx + 1;
    return (
        <MyRow className="RowCompany" onClick={props.onClick}
               cells={[
                   isNaN(idx) ? "" : idx,
                   props.item.name,
                   props.item.location,
                   props.item.licenses,
                   props.item.description
               ]}
               colWidths={props.colWidths}
               onColWidthChanged={props.onColWidthChanged}
               selected={props.selected} isHeader={props.isHeader} onCellClicked={props.onCellClicked}/>
    )
}
