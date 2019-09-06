module.exports = RowProject;
require('./style.css');
const React = require('react');
const MyRow = require('../MyRow');

function RowProject(props) {
    let idx = props.idx + 1;
    return (
        <MyRow className={"RowProject"}
               onClick={props.onClick}
               cells={[
                   isNaN(idx) ? "" : idx,
                   props.item.name,
                   props.item.company,
                   props.item.location,
                   props.item.department,
                   props.item.createdBy,
                   props.item.description,
                   props.item.shareKey
               ]}
               colWidths={props.colWidths}
               onColWidthChanged={props.onColWidthChanged}
               selected={props.selected} isHeader={props.isHeader} onCellClicked={props.onCellClicked}
        />
    )
}
