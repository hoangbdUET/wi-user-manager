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
                   <div className="cell-ellipsis">
                        {props.item.name}
                    </div>,
                    <div className="cell-ellipsis">
                        {props.item.location}
                    </div>,
                    <div className="cell-ellipsis">
                        {props.item.description}
                    </div>,
                    <div className="cell-ellipsis">
                        {props.item.createdAt}
                </div>
               ]}
               colWidths={props.colWidths}
               onColWidthChanged={props.onColWidthChanged}
               selected={props.selected} isHeader={props.isHeader} onCellClicked={props.onCellClicked}/>
    )
}
