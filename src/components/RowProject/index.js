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
                   <div className="cell-ellipsis">
                        {props.item.name}
                    </div>,
                    <div className="cell-ellipsis">
                        {props.item.company}
                    </div>,
                    <div className="cell-ellipsis">
                        {props.item.location}
                    </div>,
                    <div className="cell-ellipsis">
                        {props.item.department}
                    </div>,
                    <div className="cell-ellipsis">
                        {props.item.createdBy}
                    </div>,
                    <div className="cell-ellipsis">
                        {props.item.description}
                    </div>,
                    <div className="cell-ellipsis">
                        {props.item.shareKey}
                    </div>
               ]}
               colWidths={props.colWidths}
               onColWidthChanged={props.onColWidthChanged}
               selected={props.selected} isHeader={props.isHeader} onCellClicked={props.onCellClicked}
        />
    )
}
