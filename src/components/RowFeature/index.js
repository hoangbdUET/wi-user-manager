module.exports = RowFeature;

const React = require('react');
const MyRow = require('../MyRow');

function RowFeature(props) {
    let idx = props.idx + 1;
    return (
        <MyRow className={"RowFeature"}
               onClick={props.onClick}
               cells={[
                   isNaN(idx) ? "" : idx,
                   props.item.name,
                   props.item.description,
                   props.isHeader ? props.item.api : JSON.stringify(props.item.i2g_apis)
               ]}
               colWidths={props.colWidths}
               onColWidthChanged={props.onColWidthChanged}
               selected={props.selected}
               isHeader={props.isHeader}
               onCellClicked={props.onCellClicked}
        />
    )
}