module.exports = RowLicensePackage;
require('./style.less');
const React = require('react');
const MyRow = require('../MyRow');

function RowLicensePackage(props) {
    let idx = props.idx + 1;
    return (
        <MyRow className={"RowLicensePackage"} onClick={props.onClick}
               cells={[
                   isNaN(idx) ? "" : idx,
                   props.item.name,
                   props.item.description
               ]}
               colWidths={props.colWidths}
               onColWidthChanged={props.onColWidthChanged}
               selected={props.selected} isHeader={props.isHeader}
               onCellClicked={props.onCellClicked}
        />
    )
}