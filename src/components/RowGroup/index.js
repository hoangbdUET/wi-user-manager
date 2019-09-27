module.exports = RowGroup;
require('./style.less');
const React = require('react');
const MyRow = require('../MyRow');

function RowGroup(props) {
    let idx = props.idx + 1;
    return (
        <MyRow className="RowGroup" onClick={props.onClick}
               cells={[
                   isNaN(idx) ? "" : idx,
                   <div className="cell-ellipsis">
                        {props.item.name}
                    </div>,
                    <div className="cell-ellipsis">
                        {props.item.description}
                    </div>,
                    <div className="cell-ellipsis">
                        {props.item.company}
                    </div>
               ]}
               colWidths={props.colWidths}
               onColWidthChanged={props.onColWidthChanged}
               selected={props.selected} isHeader={props.isHeader} onCellClicked={props.onCellClicked}/>
    )
}
